import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Store
import store from "./store/store";
import { Provider } from "react-redux";

//Pages
import Home from "./container/Home";
import SignIn from "./container/SignIn";
import SignUp from "./container/SignUp";
import Navbar from "./components/Navbar";
import Dashboard from "./container/Dashboard";
import LiveBidding from "./container/LiveBidding";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/live" component={LiveBidding} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
