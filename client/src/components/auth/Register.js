import React, { Fragment } from "react";
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
  const register = (e) => {
    e.preventDefault();
    props.register("Niclas", "niclastimm", "123455", "1234556r");
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
                    // error={Reference to error here}
                    // errorText="Whats the error message?"
                    // value={Enter value here}
                    //onChange
                  />
                  <FormGroup
                    type="text"
                    label="Email"
                    name="email"
                    placeholder="e.g. 'john.doe@email.com'"
                    // error={Reference to error here}
                    // errorText="Whats the error message?"
                    // value={Enter value here}
                    //onChange
                  />
                  <FormGroup
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Enter a strong password"
                    // error={Reference to error here}
                    // errorText="Whats the error message?"
                    // value={Enter value here}
                    //onChange
                  />
                  <FormGroup
                    type="password"
                    label="Confirm password"
                    name="confirm_password"
                    placeholder="Confirm you password from above"
                    // error={Reference to error here}
                    // errorText="Whats the error message?"
                    // value={Enter value here}
                    //onChange
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
});

export default connect(mapStateToProps, { register })(Register);
