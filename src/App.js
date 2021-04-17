import React, { Fragment } from "react";
// import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages
import Home from "./conatainer/Home";
import SignIn from "./conatainer/SignIn";
import SignUp from "./conatainer/SignUp";
import Navbar from "./components/Navbar";
import Dashboard from "./conatainer/Dashboard";

//Store
import store from "./store/store";
import { Provider } from "react-redux";

// Dark Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme  from './assets/js/DarkTheme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
