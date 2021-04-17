import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";

const Navbar = (props) => {
  const SignedInLinks = (
    <ul className="right">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/live">Live Bidding</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <a onClick={props.signOut}>Log Out</a>
      </li>
    </ul>
  );
  const SignedOutLinks = (
    <ul className="right">
      <li>
        <NavLink to="/signup">Signup</NavLink>
      </li>
      <li>
        <NavLink to="/signin">Login</NavLink>
      </li>
    </ul>
  );

  const { auth } = props;
  // console.log(auth);
  const links = auth.uid ? SignedInLinks : SignedOutLinks;

  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          IPL-AUCTION
        </Link>
        {links}
      </div>
    </nav>
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
