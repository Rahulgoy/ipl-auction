import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

// style here
const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  rightToolbar: {
    marginLeft: "auto",
  },

  linkUnderline: {
    textDecoration: "none",
    color: "whitesmoke",
    cursor: "pointer",
  },
}));

const Navbar = (props) => {
  const classes = useStyle();
  const { auth } = props;

  const SignedInLinks = (
    <ul style={{ listStyle: "none", display: "flex" }}>
      {auth.uid === "zZfVKoYwMWURII0q8tmvK6rvXvi1" ? (
        <li>
          {" "}
          <Button color="inherit">
            <NavLink to="/admin" className={classes.linkUnderline}>
              Admin
            </NavLink>
          </Button>{" "}
        </li>
      ) : (
        console.log("Not Admin")
      )}

      <li>
        {" "}
        <Button color="inherit">
          <NavLink to="/" className={classes.linkUnderline}>
            Home
          </NavLink>
        </Button>{" "}
      </li>
      <li>
        {" "}
        <Button color="inherit">
          <NavLink to="/live" className={classes.linkUnderline}>
            Live Bidding
          </NavLink>
        </Button>{" "}
      </li>
      <li>
        {" "}
        <Button color="inherit">
          <NavLink to="/silent" className={classes.linkUnderline}>
            Silent Bidding
          </NavLink>
        </Button>{" "}
      </li>
      <li>
        {" "}
        <Button color="inherit">
          <NavLink to="/dashboard" className={classes.linkUnderline}>
            Dashboard
          </NavLink>
        </Button>{" "}
      </li>
      <li>
        {" "}
        <Button color="inherit">
          <a onClick={props.signOut} className={classes.linkUnderline}>
            Log Out
          </a>
        </Button>{" "}
      </li>
    </ul>
  );

  const SignedOutLinks = (
    <ul style={{ listStyle: "none", display: "flex" }}>
      {/* <li>
        {" "}
        <Button color="inherit">
          <NavLink to="/signup" className={classes.linkUnderline}>
            Signup
          </NavLink>
        </Button>{" "}
      </li> */}
      <li>
        {" "}
        <Button color="inherit">
          <NavLink to="/signin" className={classes.linkUnderline}>
            Login
          </NavLink>
        </Button>{" "}
      </li>
    </ul>
  );

  const links = auth.uid ? SignedInLinks : SignedOutLinks;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className="brand-logo" className={classes.linkUnderline}>
            <Typography variant="h6" className={classes.title}>
              IPL-AUCTION
            </Typography>
          </Link>

          <div className={classes.rightToolbar}>{links}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
