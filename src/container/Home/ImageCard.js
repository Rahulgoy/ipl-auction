import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Collapse } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    background: "rgba(0,0,0,0.5)",
    margin: "50px",
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      marginBottom: "50px",
    },
  },
  media: {
    height: 600,
    width: 350,
    transition: ".4s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
    [theme.breakpoints.down("md")]: {
      height: 360,
    },
  },
  title: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#fff",
  },
  desc: {
    fontFamily: "Nunito",
    fontSize: "1.1rem",
    color: "#ddd",
  },
  button: {
    maxWidth: 800,
  },
  buttonsection: {
    justifyContent: "center",
  },
}));

export default function ImageCard({ Image, checked, title, link }) {
  const classes = useStyles();

  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={Image}
          title="Contemplative Reptile"
        />
        {/* <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            className={classes.title}
          >
            title
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            description
          </Typography>
        </CardContent> */}
        <CardActions className={classes.buttonsection}>
          {title === "IPL" ? (
            <>
              <Link to="/dashboard">
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={classes.button}
                >
                  Enter {title} Auction
                </Button>
              </Link>
              <Button
                href=""
                variant="contained"
                size="medium"
                color="primary"
                className={classes.button}
              >
                Rulebook
              </Button>
            </>
          ) : (
            <>
              <Button
                href="https://www.google.com/"
                variant="contained"
                size="medium"
                color="primary"
                className={classes.button}
              >
                Enter {title} Auction
              </Button>
              <Button
                href=""
                variant="contained"
                size="medium"
                color="primary"
                className={classes.button}
              >
                Rulebook
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Collapse>
  );
}
