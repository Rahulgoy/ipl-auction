import React, { useEffect, useState } from "react";
// import { Bids } from "../../store/actions/playerActions";
import { connect } from "react-redux";
import firebase from "firebase";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow } from "@material-ui/core";
import { db } from "../../config/Firebase";

const useStyles = makeStyles({

});

const SilentBiddingHelper = ({ player, playerId, teamId }) => {
  const [biddingValue, setbiddingValue] = useState(parseInt(0));

  const sendBid = (e) => {
    // e.preventDefault();
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

    // window.location.reload(true);
  };
  useEffect(() => {
    if (player.status === "close") {
      db.collection("players").doc(player.name).update({
        team: player.maxbidBy,
      });
    }
  }, [player.status]);

  const classes = useStyles();

  return (
    <>
      <TableRow>
      <TableCell>{player.name}</TableCell>
      <TableCell>{player.Runs}</TableCell>
      <TableCell>{player.Batavg}</TableCell>
      <TableCell>{player.strikerate}</TableCell>
      <TableCell>{player.wickets}</TableCell>
      <TableCell>{player.Bowlavg}</TableCell>
      <TableCell>{player.economy}</TableCell>
      <TableCell>{player.baseprice}</TableCell>
      <TableCell>{player.maxbid}</TableCell>
      <TableCell>
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
      </TableCell>

    </TableRow>
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