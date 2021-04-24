import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//styles
import "./App.css";

//Store
import store from "./store/store";
import { Provider } from "react-redux";

//Pages
import Home from "./container/Home";
import SignIn from "./container/SignIn";
import SignUp from "./container/SignUp";
import Navbar from "./components/Navbar";

import Dashboard from "./container/Dashboard";
import LiveBidding from "./container/LiveBidding/LiveBidding";
import SilentBidding from "./container/SilentBidding/SilentBidding";

// Dark Theme
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/js/DarkTheme";
import Admin from "./container/Admin/Admin";
import PlayerForm from "./container/Admin/PlayerForm";
import UpdatePlayer from "./container/Admin/UpdatePlayer";
import UserUpdate from "./container/Admin/UserUpdate";
import PlayerSlots from "./container/Admin/PlayerSlots";

function App() {
  const RedirectToNotFound = () => {
    return <h1>Page Not Found</h1>;
  };

  const WithNavbar = ({ component }) => {
    return (
      <>
        <Navbar />
        <Route component={component} />
      </>
    );
  };
  const WithoutNavbar = ({ component }) => {
    return <Route component={component} />;
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <WithoutNavbar exact path="/" component={Home} />
            <WithNavbar exact path="/signin" component={SignIn} />
            <WithNavbar exact path="/signup" component={SignUp} />
            <WithNavbar exact path="/dashboard" component={Dashboard} />
            <WithNavbar exact path="/live" component={LiveBidding} />
            <WithNavbar exact path="/silent" component={SilentBidding} />
            <WithNavbar exact path="/admin" component={Admin} />
            <WithNavbar exact path="/playerform" component={PlayerForm} />
            <WithNavbar exact path="/updateplayer" component={UpdatePlayer} />
            <WithNavbar exact path="/updateuser" component={UserUpdate} />
            <WithNavbar exact path="/playerslot" component={PlayerSlots} />
            <WithoutNavbar component={RedirectToNotFound} />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
