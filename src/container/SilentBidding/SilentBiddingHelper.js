import React, { useEffect, useState } from "react";
// import { Bids } from "../../store/actions/playerActions";
import { connect } from "react-redux";
import firebase from "firebase";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow } from "@material-ui/core";
import { db } from "../../config/Firebase";

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

const SilentBiddingHelper = ({ player, playerId, teamId }) => {
  const [biddingValue, setbiddingValue] = useState("");
  const [maxBid, setmaxBid] = useState(0);
  //console.log(player);
  const sendBid = (e) => {
    e.preventDefault();
    db.collection("players")
      .doc(player.name)
      .collection("Bids")
      .doc(teamId)
      .set({
        bid: [
          {
            biddingprice: biddingValue,
            timestamp: firebase.firestore.Timestamp.now(),
          },
        ],
      });
    console.log("Maxbid:", player.maxbid);
    console.log("Price:", biddingValue);
    if (parseInt(player.maxbid) < parseInt(biddingValue)) {
      db.collection("players").doc(player.name).update({
        maxbid: biddingValue,
        maxbidBy: teamId,
      });
    }
    setbiddingValue("");
    // window.location.reload(true);
  };
  useEffect(() => {
    db.collection("players")
      .doc(player.name)
      .onSnapshot((snapshot) => {
        setmaxBid(snapshot.data().maxbid);
      });
  }, [player.maxbidBy]);

  /// Assign Players
  useEffect(() => {
    db.collection("players")
      .where("category", "==", "silent")
      .where("status", "==", "close")
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          snapshot.docs.map((doc) => {
            console.log(doc.data().name);
            console.log(doc.data().maxbidBy);
            db.collection("players").doc(doc.data().name).update({
              team: doc.data().maxbidBy,
            });
            const ref3 = db.collection("users").doc(doc.data().maxbidBy);

            ref3.onSnapshot((snapshot) => {
              if (snapshot.exists) {
                console.log(snapshot.data().teamBalance);
                ref3.update({
                  teamBalance:
                    parseInt(snapshot.data().teamBalance) -
                    parseInt(doc.data().maxbid),
                });
              }
            });
          });
        }
      });
  }, [player.status]);
  /* if (player.status === "close") {
      db.collection("players").doc(player.name).update({
        team: player.maxbidBy,
      });
      const ref3 = db.collection("users").doc(player.maxbidBy);

      ref3.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          ref3.update({
            teamBalance:
              parseInt(snapshot.data().teamBalance) - parseInt(player.maxbid),
          });
        }
      });
    } */

  return (
    <>
      <StyledTableRow>
        <StyledTableCell>{player.name}</StyledTableCell>
        <StyledTableCell>{player.Runs}</StyledTableCell>
        <StyledTableCell>{player.Batavg}</StyledTableCell>
        <StyledTableCell>{player.strikerate}</StyledTableCell>
        <StyledTableCell>{player.wickets}</StyledTableCell>
        <StyledTableCell>{player.Bowlavg}</StyledTableCell>
        <StyledTableCell>{player.economy}</StyledTableCell>
        <StyledTableCell>{player.rating}</StyledTableCell>
        <StyledTableCell>{player.baseprice}</StyledTableCell>
        <StyledTableCell>{maxBid}</StyledTableCell>
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
      </StyledTableRow>
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
