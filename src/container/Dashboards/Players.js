import React from "react";
import DisplayPlayer from "./DisplayPlayer";

const Players = ({ players }) => {
  //console.log("length", players.length);
  if (players.length < 1) {
    return <p>No Players Available</p>;
  }
  return (
    <div className="section-center">
      <table className="menu-item">
        <tr className="item-info">
          <th>Name</th>
          <th>Rating</th>
          <th>Highest Bid</th>
          <th>Base Price</th>
        </tr>
        {players.map((player) => {
          return <DisplayPlayer key={player.id} player={player} />;
        })}
      </table>
    </div>
  );
};

export default Players;
