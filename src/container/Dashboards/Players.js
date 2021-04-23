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
  TableBody,
  TableContainer,
  Table,
  Box,
  TableHead,
} from "@material-ui/core";
import DisplayPlayer from "./DisplayPlayer";
const StyledTableCell = withStyles((theme) => ({}))(TableCell);
const StyledTableRow = withStyles((theme) => ({}))(TableRow);

const Players = ({ players }) => {
  //console.log("length", players.length);
  if (players.length < 1) {
    return <p>No Players Available</p>;
  }
  return (
    <Container>
      <div>
        {/* <img src={BlurredImage} style={{backgroundRepeat: 'cover'}}></img> */}
        <div>
          <TableContainer>
            <Table style={{ borderRadius: "5px" }}>
              <Box borderRadius={10} border={1} borderColor="secondary">
                <TableHead>
                  <TableCell>
                    {" "}
                    <Typography color="primary">Name </Typography>{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography color="primary">Rating </Typography>{" "}
                  </TableCell>

                  <TableCell>
                    {" "}
                    <Typography color="primary">Highest Bid</Typography>{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography color="primary">Base Price </Typography>{" "}
                  </TableCell>
                </TableHead>
                <TableBody>
                  {players.map((player) => {
                    return <DisplayPlayer key={player.id} player={player} />;
                  })}
                </TableBody>
              </Box>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
};

export default Players;
