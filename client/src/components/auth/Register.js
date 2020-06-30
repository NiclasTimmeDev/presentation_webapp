import React, { Fragment, useState } from "react";
import styled from "styled-components";

//redux
import { connect } from "react-redux";
import { register } from "./../../redux/actions/auth";

//Components
import FormGroup from "./../uiElements/FormElements/FormGroup";
import LinkText from "./../uiElements/LinkText";
import { HeroHeader } from "./../uiElements/Header";
import { PrimaryButton } from "./../uiElements/Button";

//assets
import presentationPic from "./../../assets/presentation.jpg";

//Styles
const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const Register = (props) => {
  /*===================
  STATE
  ===================*/
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmed: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    props.register(
      formData.username,
      formData.email,
      formData.password,
      formData.password_confirmed
    );
  };

  return (
    <Fragment>
      <div className="container-fluid p-0">
        <div className="row justify-content-center align-items-center no-gutters">
          <div className="col-6 no-gutters">
            <div className="row justify-content-center no-gutters">
              <div className="col-6 no-gutters">
                <HeroHeader>Register</HeroHeader>
                <form
                  onSubmit={(e) => {
                    register(e);
                  }}
                >
                  <FormGroup
                    type="text"
                    label="Username"
                    name="username"
                    placeholder='e.g., "John Doe"'
                    error={props.errors.username}
                    errorText={props.errors.username && props.errors.username}
                    value={formData.username}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <FormGroup
                    type="text"
                    label="Email"
                    name="email"
                    placeholder="e.g. 'john.doe@email.com'"
                    errorText={props.errors.email && props.errors.email}
                    error={props.errors.email}
                    value={formData.email}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <FormGroup
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Enter a strong password"
                    errorText={props.errors.password && props.errors.password}
                    error={props.errors.password}
                    value={formData.password}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <FormGroup
                    type="password"
                    label="Confirm password"
                    name="password_confirmed"
                    placeholder="Confirm you password from above"
                    errorText={
                      props.errors.password_confirmed &&
                      props.errors.password_confirmed
                    }
                    error={props.errors.password_confirmed}
                    value={formData.password_confirmed}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <LinkText to="/termsandconditions">
                    By registering you accept our terms and conditions
                  </LinkText>
                  <LinkText to="/login">
                    Already have an account? Login!
                  </LinkText>
                  <PrimaryButton fullWidth={true} type="submit">
                    Register
                  </PrimaryButton>
                </form>
              </div>
            </div>
          </div>
          <div className="col-6 no-gutters">
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
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  errors: state.auth.registerError,
});

export default connect(mapStateToProps, { register })(Register);
