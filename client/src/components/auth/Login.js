import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

//components
import FormGroup from "./../uiElements/FormElements/FormGroup";
import { PrimaryButton } from "./../uiElements/Button";
import LinkText from "./../uiElements/LinkText";
import { HeroHeader } from "./../uiElements/Header";

//assets
import presentationPic from "./../../assets/presentation.jpg";

//Styles
const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const Login = (props) => {
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-6">
            <div className="row justify-content-center">
              <div className="col-6">
                <HeroHeader>Login</HeroHeader>
                <form>
                  <FormGroup
                    type="text"
                    label="Email"
                    name="email"
                    placeholder='e.g., "john.doe@email.com"'
                    // error={Reference to error here}
                    // errorText="Whats the error message?"
                    // value={Enter value here}
                    //onChange
                  />
                  <FormGroup
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="The password for your account"
                    // error={Reference to error here}
                    // errorText="Whats the error message?"
                    // value={Enter value here}
                    //onChange
                  />
                  <LinkText to="/restorepassword">Forgot Password?</LinkText>
                  <LinkText to="/register">
                    Don't have an account? Register now!
                  </LinkText>
                  <PrimaryButton fullWidth={true} type="submit">
                    Login
                  </PrimaryButton>
                </form>
              </div>
            </div>
          </div>
          <div className="col-6">
            <Image
              src={presentationPic}
              alt="Man holding a presentaion abount an app"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {};

export default Login;
