import React, { useState, useEffect } from "react";
import { db } from "../../config/Firebase";
import { Bids } from "../../store/actions/playerActions";
import { connect } from "react-redux";
import SilentBiddingHelper from "./SilentBiddingHelper";

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    // minWidth: 700,
  },
});

const SilentBidding = ({ auth, playerB }) => {
  const [silentPlayers, setSilentPlayers] = useState([]);

  const [playerId, setplayerId] = useState("");

  const fetchSilent = () => {
    db.collection("players")
      .where("category", "==", "silent")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setplayerId(doc.id);

          console.log(doc.id, "=>", doc.data());
          setSilentPlayers((silentPlayers) => [
            ...silentPlayers,
            { id: doc.id, data: doc.data() },
          ]);
        });
      })
      .catch((error) => {
        console.log("Could not fetch");
      });
  };

  console.log(silentPlayers);
  /* let arr = Object.entries(silentPlayers);
  console.log("Arr:", arr); */
  useEffect(() => {
    console.log("Working....");

    fetchSilent();
  }, []);

  const classes = useStyles();
  return (
    <Container>
      <h1>Silent</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead stickyHeader>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Runs</StyledTableCell>
              <StyledTableCell>Batting Avg</StyledTableCell>
              <StyledTableCell>Strike Rate</StyledTableCell>
              <StyledTableCell>Wickets</StyledTableCell>
              <StyledTableCell>Bowling Avg</StyledTableCell>
              <StyledTableCell>Economy</StyledTableCell>
              <StyledTableCell>Baseprice</StyledTableCell>
              <StyledTableCell>Max Bid</StyledTableCell>
              <StyledTableCell>Place Bid</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <StyledTableRow>
              {silentPlayers.map((player) => {
                return player ? (
                  <SilentBiddingHelper
                    key={player.id}
                    player={player.data}
                    playerId={playerId}
                    teamId={auth.uid}
                  />
                ) : (
                  console.log("No player")
                );
              })}
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    playerB: state.playerB,
  };
};

export default connect(mapStateToProps)(SilentBidding);
