import {
  Button,
  Container,
  createMuiTheme,
  Grid,
  makeStyles,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";
import React from "react";
// import footerTheme from "../assets/js/FooterTheme";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { ImportantDevices } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    fontFamily: "",
  },
  container: {
    position: "absolute",
    padding: 10,
    backgroundColor: "#202020",
    borderStyle: "solid",
    borderWidth: "1px 0px 0px",
    borderColor: "grey",
    color: "white",
    bottom: "0",
    fontFamily: "",
    position: "relative",
  },
  designed: {
    padding: 10,
    backgroundColor: "#202329",
    [theme.breakpoints.down("md")]: {
      padding: 7,
    },
  },
  designedText: {
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
  },
  icons: {
    fontSize: "1.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
  },
  links: {
    textDecoration: "none",
    fontSize: "1.5rem",
    margin: "0 5px",
    color: "white",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.4rem",
      margin: "0 2px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
    "&:hover": {
      color: "goldenrod",
    },
  },
  text: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6rem",
    },
  },
}));

const footerTheme = createMuiTheme({});

const Footer = () => {
  const classes = useStyles();
  return (
    <div className="root" style={{ marginTop: "50px" }}>
      <Container maxWidth="false" className={classes.container}>
        <Grid container justify="center" align="center">
          <Grid item xs={12} spacing={3} style={{ display: "flex" }}>
            <Grid item xs={4}>
              <Typography variant="h6" className={classes.text}>
                Gaurab:74249-47745
              </Typography>
            </Grid>
            <Grid item xs={4} className={classes.icons}>
              <a href="https://www.facebook.com/econthapar">
                <FacebookIcon className={classes.links} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCnyVX3sGVJEno_WwLouHXtA"
                className={classes.links}
              >
                <YouTubeIcon style={{}} className={classes.links} />
              </a>
              <a href="https://www.instagram.com/econ_tiet/">
                <InstagramIcon className={classes.links} />
              </a>
              <a href="https://in.linkedin.com/company/econclub">
                <LinkedInIcon className={classes.links} />
              </a>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" className={classes.text}>
                Jatin:98739-01591
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.designed}>
            <Typography variant="h6" className={classes.designedText}>
              Designed by ECON technical team
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
