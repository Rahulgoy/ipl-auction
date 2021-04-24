import { Button, Container } from "@material-ui/core";
import React from "react";

import {makeStyles} from '@material-ui/core';
import "../../assets/css/dashboard.css";

const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: '2rem',
      padding: 1,
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',

      [theme.breakpoints.down("md")]: {
        fontSize: '0.6em',
        display: 'block',
      }
    },
    
    buttonStyle: {
      fontSize: '1em',
      [theme.breakpoints.down("md")]: {
        marginBottom: '10px'
      }
    }
}));



const Categories = ({ filterPlayers, categories }) => {

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {categories.map((category) => {
        // console.log(category);
        return (
          
              <Button 
                variant='contained' 
                color="primary"  
                type="button"
                className={classes.buttonStyle}
                style={{marginLeft: '5px', padding: '5px 0px'}}
                key={category.id}
                onClick={() => filterPlayers(category.data, category.id)}
              > 
                {category.data}

            </Button>
            
        );
      })}
    </div>
  );
};

export default Categories;