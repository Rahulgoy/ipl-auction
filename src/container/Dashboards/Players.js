import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  Button,
  Container,
  Grid,
  Typography,
  TableRow,
  TextField,
} from "@material-ui/core";
const StyledTableCell = withStyles((theme) => ({}))(TableCell);
const StyledTableRow = withStyles((theme) => ({}))(TableRow);


const Players = ({ players }) => {
  //console.log("length", players.length);
  if (players.length < 1) {
    return <p>No Players Available</p>;
  }
  return (
    <div className="">
      {players.map((player) => {


        return (
          <div key={player.id} className='item-info'> 


      <StyledTableRow>
            <StyledTableCell>{player.data.name}</StyledTableCell>
            <StyledTableCell>{player.data.maxbid}</StyledTableCell>
            <StyledTableCell>{player.data.baseprice}</StyledTableCell>
      </StyledTableRow>   
          
          </div>



          // <table key={player.id} className="menu-item">
          //   <tr className="item-info">
          //     <th>Name</th>
          //     <th>Highest Bid</th>
          //     <th>Base Price</th>
          //   </tr>

          // </table>
        );
      })}
    </div>
  );
};

export default Players;