//3rd party
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

//global styling
import "./styles/App.css";
import "./styles/bootstrap-grid.min.css";
import "./styles/grid-modified.css";

//components
import Alert from "./components/uiElements/Alert";
import store from "./redux/store";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

//Theme:
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Fragment>
          <Alert />
          <Router>
            <Switch>
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
            </Switch>
          </Router>
        </Fragment>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
