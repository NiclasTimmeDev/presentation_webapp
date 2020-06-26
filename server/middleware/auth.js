const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const helperFunctions = require("./../helpers/helperFunctions");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return helperFunctions.sendCustom400Error(res, "Access denied.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    helperFunctions.sendServerErrorMsg(res, error);
  }
};
