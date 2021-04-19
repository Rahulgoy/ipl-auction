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
    </>
  );
};

export default Admin;
