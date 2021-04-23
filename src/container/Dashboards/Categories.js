import { Button, Container } from "@material-ui/core";
import React from "react";

import {
  Box,
  Grid,
  Typography,
} from "@material-ui/core";

import "../../assets/css/dashboard.css";


const Categories = ({ filterPlayers, categories }) => {
  return (
    <div className="btn-container">
      {categories.map((category) => {
        // console.log(category);
        return (
          

            
              <Button 
                variant='contained' 
                color="primary"  
                type="button"
                className="filter-btn"
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