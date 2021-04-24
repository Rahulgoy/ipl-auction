import React from "react";
import { makeStyles } from "@material-ui/core";
import ImageCard from "./ImageCard";
import useWindowPosition from "../../assets/hook/useWindowPosition";
import ipl from "../../assets/img/iplweb.png";
import uefa from "../../assets/img/uefaweb.png";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: 'row',

    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      // padding: 0.5,
      marginBottom: '0px'
      
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
