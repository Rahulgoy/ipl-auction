import React from "react";
import PlayerSection from "./PlayerSection";

const General = ({ player }) => {
  return (
    <div>
      <h1>{player.teamName}</h1>
      <h3>{player.initials}</h3>
      <h3>{console.log(typeof player.teambalance)}Cr</h3>
    </div>
  );
};

export default General;
