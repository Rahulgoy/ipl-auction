import React from "react";

const DisplayPlayer = ({ player }) => {
  return (
    <>
      <tr>
        <td>{player.data.name}</td>
        <td>{player.data.rating}</td>
        <td className="price">{player.data.maxbid}</td>
        <td className="item-text">{player.data.baseprice}</td>
      </tr>
    </>
  );
};

export default DisplayPlayer;
