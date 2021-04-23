import React from "react";

import "../../assets/css/dashboard.css";


const Categories = ({ filterPlayers, categories }) => {
  return (
    <div className="btn-container">
      {categories.map((category) => {
        // console.log(category);
        return (
          <button
            type="button"
            className="filter-btn"
            key={category.id}
            onClick={() => filterPlayers(category.data, category.id)}
          >
            {category.data}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;