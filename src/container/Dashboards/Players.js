import React from "react";

const Players = ({ players }) => {
  return (
    <div className="section-center">
      {players.map((player) => {
        return (
          <table key={player.id} className="menu-item">
            <tr className="item-info">
              <th>Name</th>
              <th>Highest Bid</th>
              <th>Base Price</th>
            </tr>
            <tr>
              <td>{player.data.name}</td>
              <td className="price">{player.data.maxbid}</td>

              <td className="item-text">{player.data.baseprice}</td>
            </tr>
          </table>
        );
      })}
    </div>
  );
};

export default Players;
