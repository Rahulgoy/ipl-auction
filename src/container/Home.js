import { CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import Footer from "../components/Footer";
import EnterAuction from "./Home/EnterAuction";
import Header from "./Home/Header";

const useStyles = makeStyles({
  root: {
    height: '100vh',
    zIndex: 1,
    backgroundImage: `url(${"https://firebasestorage.googleapis.com/v0/b/uefa-auction.appspot.com/o/bg.jpeg?alt=media&token=05c8861f-5c0b-42fe-b475-b61e87a9d9b6"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: '100%',
    width: '100%'
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
