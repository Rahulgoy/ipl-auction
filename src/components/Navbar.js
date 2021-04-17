import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';


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
    textDecoration: 'none',
    color: 'whitesmoke'
  }

}));

const Navbar = (props) => {

  const classes = useStyle();

  const SignedInLinks = (
    <ul>
      <li> <NavLink to="/" className={classes.linkUnderline}>Home</NavLink> </li>
      <li> <a onClick={props.signOut} className={classes.linkUnderline}>Log Out</a> </li>
    </ul>
  );
  const SignedOutLinks = (
    <ul style={{listStyle: 'none', display: "flex"}}>
      <li> <Button color="inherit"><NavLink to="/signup" className={classes.linkUnderline}>Signup</NavLink></Button> </li>
      <li> <Button color="inherit"><NavLink to="/signin" className={classes.linkUnderline}>Login</NavLink></Button> </li>
    </ul>
  );

  const { auth } = props;
  const links = auth.uid  ? SignedInLinks : SignedOutLinks;

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Link to="/" className="brand-logo" className={classes.linkUnderline}>
          <Typography variant="h6" className={classes.title}>
            IPL-AUCTION
          </Typography>
        </Link>
        <div className={classes.rightToolbar}>
          { links}
        </div>
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
