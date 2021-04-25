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
      height: 320,
      
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
    backgroundColor: "#5AFF3D",
  },
  buttonsection: {
    justifyContent: "center",
  },
  homeWrapper: {
    paddingBottom: '0px'
  }
}));

export default function ImageCard({ Image, checked, title, link }) {
  const classes = useStyles();

  return (
    <div className={classes.homeWrapper}>
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
            color="text#5AFF3D"
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
                  className={classes.button}
                >
                  Enter {title} Auction
                </Button>
              </Link>
              <Button
                href="https://firebasestorage.googleapis.com/v0/b/ipl-auction-7dbdb.appspot.com/o/logos%2FRuleBook.pdf?alt=media&token=7be029af-f85f-4192-8f5c-99b63ae1dba1"
                variant="contained"
                size="medium"
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
                className={classes.button}
              >
                Enter {title} Auction
              </Button>
              <Button
                href="https://drive.google.com/file/d/1A_CyGdMkSU8BUdoUuzQT30VJcZvvEBdq/view"
                target="_blank"
                variant="contained"
                size="medium"
                className={classes.button}
              >
                Rulebook
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Collapse>
    </div>
  );
}
