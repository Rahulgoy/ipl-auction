import { Collapse, IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link as Scroll } from "react-scroll";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    fontFamily: "Nunito",
  },
  title: {
    fontSize: "4rem",
    color: "#fff",
  },
  goDown: {
    color: "#5AFF3D",
    fontSize: "5rem",
  },
  container: {
    textAlign: "center",
  },
});
const Header = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root} id="header">
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to
            <br /> Econ Auctions
          </h1>
          <Scroll to="enter-auction" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
};

export default Header;
