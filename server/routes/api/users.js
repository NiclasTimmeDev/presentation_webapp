const express = require("express");
const router = new express.Router();
const User = require("./../../models/User");
const cookieParser = require("cookie-parser");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const auth = require("./../../middleware/auth");
const bcrypt = require("bcryptjs");

const helpers = require("./../../helpers/helperFunctions");
const helperFunctions = require("./../../helpers/helperFunctions");

router.use(cookieParser());

/*======================================
REGISTER
@Route: /api/users/register
@Method: POST
@Access: Public
@Response: token
@Required request data: username, email, password1, password2
======================================*/
router.post("/register", async (req, res) => {
  try {
    const { username, email, password1, password2 } = req.body;

    if (username === "") {
      return helperFunctions.sendCustom400Error(res, "Please enter a username");
    }

    if (!validator.isEmail(email)) {
      return helpers.sendCustom400Error(
        res,
        "Please enter a valid email address."
      );
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return helpers.sendCustom400Error(
        res,
        "Sorry, this email address is already taken."
      );
    }

    if (password1 === "") {
      return helpers.sendCustom400Error(res, "Please enter password.");
    }
    if (password2 === "") {
      return helpers.sendCustom400Error(res, "Please confirm your password.");
    }
    if (password1 !== password2) {
      return helpers.sendCustom400Error(res, "Your passwords must match.");
    }
    if (password1.length < 8) {
      return helpers.sendCustom400Error(
        res,
        "Your password must have at least 8 characters."
      );
    }
    if (
      password1.includes("passwor") ||
      password1.includes("123456") ||
      password1.includes("000000")
    ) {
      return helpers.sendCustom400Error(
        res,
        "Your password may not include 'password', '123456' or '000000'"
      );
    }

    const newUser = new User({
      username: username,
      email: email,
      password: password1,
    });

    const tokenpayload = {
      user: {
        _id: newUser._id,
      },
    };
    const token = helperFunctions.signToken(tokenpayload);
    if (!token) {
      return helperFunctions.sendServerErrorMsg(
        res,
        "Sorry, something went wrong. Please try again later."
      );
    }
    await newUser.save();
    res
      .status(201)
      .cookie("token", token, { httpOnly: true, maxAge: 3600 })
      .send(token);
  } catch (error) {
    helpers.sendServerErrorMsg(res, error);
  }
});

/*======================================
LOGIN
@Route: /api/users/login
@Method: POST
@Access: Public
@Response: token
@Required request data: email, password
======================================*/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    return helperFunctions.sendCustom400Error(
      res,
      "Please provide a valid email address."
    );
  }
  if (password === "") {
    return helperFunctions.sendCustom400Error(res, "Please enter a password");
  }

  const user = await User.findByCredentials(email, password);
  if (!user) {
    return helperFunctions.custom404Error(
      res,
      "Invalid credentials. Please try again."
    );
  }

  const tokenpayload = {
    user: {
      _id: user._id,
    },
  };
  const token = helperFunctions.signToken(tokenpayload);
  if (!token) {
    return helperFunctions.sendServerErrorMsg(
      res,
      "Sorry, something went wrong. Please try again later."
    );
  }

  res
    .status(201)
    .cookie("token", token, { httpOnly: true, maxAge: 3600 })
    .send(token);
});
/*======================================
GET USER
@Route: /api/users/get/single
@Method: GET
@Access: private
@Response: User object
@Required request data: none
======================================*/
router.get("/get/single", auth, async (req, res) => {
  try {
    const id = req.user;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return helperFunctions.custom404Error(res, "User not found.");
    }
    res.status(200).send(user);
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

/*======================================
UPDATE USER
@Route: /api/users/update
@Method: PATCH
@Access: private
@Response: User object
@Request data: usernamme, olPassword, newPassword, newPasswordConfirmed (all optional, but the last three must all be provided i.o to change password)
======================================*/
router.patch("/update", auth, async (req, res) => {
  try {
    const {
      username,
      oldPassword,
      newPassword,
      newPasswordConfirmed,
    } = req.body;
    const user = await User.findById(req.user);

    if (!user) {
      return helperFunctions.sendCustom400Error(
        res,
        "User not found. Access denied."
      );
    }
    if (req.body.premium) {
      return helperFunctions.sendCustom400Error(
        res,
        "You may not change your premium status."
      );
    }

    if (username) {
      user.username = username;
    }

    if (oldPassword === "") {
      return helperFunctions.sendCustom400Error(
        res,
        "Please enter your current password"
      );
    }

    if (oldPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return helperFunctions.sendCustom400Error(
          res,
          "Your current password is invalid."
        );
      }
      if (
        !newPassword ||
        newPassword === "" ||
        !newPasswordConfirmed ||
        newPasswordConfirmed === ""
      ) {
        return helperFunctions.sendCustom400Error(
          res,
          "You must enter new passwords in order to change you current password."
        );
      } else {
        if (newPassword.length < 8) {
          return helperFunctions.sendCustom400Error(
            res,
            "Your new password must be 8 characters or longer."
          );
        }
        if (
          newPassword.includes("passwor") ||
          newPassword.includes("123456") ||
          newPassword.includes("000000")
        ) {
          return helperFunctions.sendCustom400Error(
            res,
            "Your password may not include 'password', '123456' or '000000'"
          );
        }
      }
      user.password = newPassword;
    }

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

/*======================================
LOGOUT
@Route: /api/users/logout
@Method: POST
@Access: private
@Response: empty
@Required request data: none
======================================*/
router.post("/logout", auth, async (req, res) => {
  try {
    if (req.cookies.token) {
      res.status(200).clearCookie("token").send("Logged out");
    }
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

/*======================================
DELETE USER
@Route: /api/users/delete
@Method: DELETE
@Access: private
@Response: empty
@Required request data: none
======================================*/
router.delete("/delete", auth, async (req, res) => {
  try {
    const _id = req.user;
    await User.deleteOne({ _id });
    res.status(200).send("User deleted");
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
});

module.exports = router;
