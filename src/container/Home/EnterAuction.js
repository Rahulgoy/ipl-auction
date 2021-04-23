import React from "react";
import { makeStyles } from "@material-ui/core";
import ImageCard from "./ImageCard";
import useWindowPosition from "../../assets/hook/useWindowPosition";
import ipl from "../../assets/img/iplwebsite.png";
import uefa from "../../assets/img/websiteuefa.png";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));
const EnterAuction = () => {
  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div className={classes.root} id="enter-auction">
      <ImageCard Image={ipl} checked={checked} title={"IPL"} />
      <ImageCard Image={uefa} checked={checked} title={"UEFA"} />
    </div>
  );
};

export default EnterAuction;
