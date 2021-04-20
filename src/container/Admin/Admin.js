import { Button } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router";
import { Link, NavLink } from "react-router-dom";
import PlayerForm from "./PlayerForm";

const Admin = () => {
  return (
    <>
      <Button color="inherit">
        <NavLink to="/playerform">Add Player</NavLink>
      </Button>
      <Button color="inherit">
        <NavLink to="/updateplayer">Update Player</NavLink>
      </Button>
      <Button color="inherit">
        <NavLink to="/updateuser">Update User</NavLink>
      </Button>
      <Button color="inherit">
        <NavLink to="/signup">Add User/Team</NavLink>
      </Button>
    </>
  );
};

export default Admin;
