import React from "react";
import { makeStyles } from "@material-ui/core";
import ImageCard from "./ImageCard";
import useWindowPosition from "../../assets/hook/useWindowPosition";
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
      <ImageCard
        Image={
          "https://firebasestorage.googleapis.com/v0/b/ipl-auction-7dbdb.appspot.com/o/ARCHER.png?alt=media&token=18321a11-3a83-4ca8-bac9-dc96329d8a20"
        }
        checked={checked}
        title={"IPL"}
      />
      <ImageCard
        Image={
          "https://firebasestorage.googleapis.com/v0/b/ipl-auction-7dbdb.appspot.com/o/RUSSELL.png?alt=media&token=be6ad299-67b8-4c57-92ef-d1d8e84134d5"
        }
        checked={checked}
        title={"UEFA"}
      />
    </div>
  );
};

export default EnterAuction;
