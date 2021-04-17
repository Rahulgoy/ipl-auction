import React from "react";
import PlayerSection from "./PlayerSection";

const General = ({ player }) => {
  return (
    <div>
      <h1>{player.teamName}</h1>
      <h3>{player.initials}</h3>
      <h3>{console.log(player.teambalance)}Cr</h3>
      <PlayerSection player={player.players} />
    </div>
  );
};

export default General;
