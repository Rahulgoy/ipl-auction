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
      fontSize: "1rem",
    },
  },
  icons: {
    fontSize: "2rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
  },
  links: {
    textDecoration: "none",
    fontSize: "2.5rem",
    margin: "0 5px",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.1rem",
      margin: "0 2px",
    },
  },
  text: {
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  },
}));

const footerTheme = createMuiTheme({
  /* overrides: {
    MuiTypography: {
      h5: {
        fontSize: "1rem",
        [footerTheme.breakpoints.down("xs")]: {
          fontSize: "0.6rem",
        },
      },
    },
  }, */
});

const Footer = () => {
  const classes = useStyles();
  return (
    <div className="root">
      <Container maxWidth="false" className={classes.container}>
        <Grid container justify="center" align="center">
          <Grid item xs={12} spacing={3} style={{ display: "flex" }}>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.text}>
                Gaurab:6549873212
              </Typography>
            </Grid>
            <Grid item xs={4} className={classes.icons}>
              <FacebookIcon className={classes.links} />
              <a href="#" className={classes.links}>
                <YouTubeIcon
                  style={{ color: "white" }}
                  className={classes.links}
                />
              </a>
              <InstagramIcon className={classes.links} />
              <LinkedInIcon className={classes.links} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" className={classes.text}>
                Gaurab:6549873212
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
