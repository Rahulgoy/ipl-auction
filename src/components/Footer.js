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
const useStyles = makeStyles({
  root: {},
  container: {
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
  },
  icons: {
    fontSize: "2rem",
  },
  links: {
    textDecoration: "none",
  },
});
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
    <MuiThemeProvider theme={footerTheme}>
      <Container maxWidth="false" className={classes.container}>
        <Grid container justify="center" align="center">
          <Grid item xs={12} spacing={3} style={{ display: "flex" }}>
            <Grid item xs={4}>
              <Typography variant="h5">Gaurab:6549873212</Typography>
            </Grid>
            <Grid item xs={4} className={classes.icons}>
              <a href="#" className={classes.links}>
                <YouTubeIcon style={{ color: "white", margin: "0 5px" }} />
              </a>
              <FacebookIcon style={{ margin: "0 5px" }} />
              <InstagramIcon style={{ margin: "0 5px" }} />
              <LinkedInIcon style={{ margin: "0 5px" }} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5">Gaurab:6549873212</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.designed}>
            <Typography variant="h6">
              Designed by ECON technical team
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </MuiThemeProvider>
  );
};

export default Footer;
