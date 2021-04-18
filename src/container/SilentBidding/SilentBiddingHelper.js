import React, { useState } from "react";
// import { Bids } from "../../store/actions/playerActions";
import { connect } from "react-redux";
import firebase from "firebase";

import { withStyles, makeStyles } from "@material-ui/core/styles";
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
import { db } from "../../config/Firebase";
// import classes from "*.module.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const SilentBiddingHelper = ({ player, playerId, teamId }) => {
  const [biddingValue, setbiddingValue] = useState(parseInt(player.baseprice));

  const sendBid = (e) => {
    e.preventDefault();

    db.collection("players")
      .doc(player.name)
      .collection("Bids")
      .doc(teamId)
      .set(
        {
          bid: [
            {
              biddingprice: biddingValue,
              timestamp: firebase.firestore.Timestamp.now(),
            },
          ],
        },
        { merge: true }
      );
    console.log("Maxbid:", player.maxbid);
    console.log("Price:", biddingValue);
    if (player.maxbid < biddingValue) {
      db.collection("players").doc(player.name).update({
        maxbid: biddingValue,
        maxbidBy: teamId,
      });
    }
  };
  return (
    <>
      {/* <h1>{playerId}</h1> */}

      <StyledTableCell>{player.name}</StyledTableCell>
      <StyledTableCell>{player.Runs}</StyledTableCell>
      <StyledTableCell>{player.Batavg}</StyledTableCell>
      <StyledTableCell>{player.strikerate}</StyledTableCell>
      <StyledTableCell></StyledTableCell>
      <StyledTableCell></StyledTableCell>
      <StyledTableCell></StyledTableCell>
      <StyledTableCell>{player.baseprice}</StyledTableCell>
      <StyledTableCell>{player.maxbid}</StyledTableCell>
      <StyledTableCell>
        <form onSubmit={sendBid}>
          <input
            value={biddingValue}
            onChange={(event) => {
              event.preventDefault();
              setbiddingValue(event.target.value);
            }}
          />
          <button
            type="submit"
            /* onClick={(event) => {
              event.preventDefault();
              Bids(playerId, nextBid);
            }} */
          >
            Bid
          </button>
        </form>
      </StyledTableCell>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    playerB: state.playerB,
  };
};

/* const mapDispatchToProps = (dispatch) => {
  return {
    Bids: (playerId, biddingprice) => dispatch(Bids(playerId, biddingprice)),
  };
}; */
export default connect(mapStateToProps)(SilentBiddingHelper);
