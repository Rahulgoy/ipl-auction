import { CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import Footer from "../components/Footer";
import EnterAuction from "./Home/EnterAuction";
import Header from "./Home/Header";

const useStyles = makeStyles({
  root: {
    height: '100vh',
    zIndex: 1,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
});
const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <EnterAuction />
      <Footer />
    </div>
  );
};

export default Home;
