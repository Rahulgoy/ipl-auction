import React, { useEffect, useState } from "react";
// import { Bids } from "../../store/actions/playerActions";
import { connect } from "react-redux";
import firebase from "firebase";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  TableRow,
} from "@material-ui/core";
import { db } from "../../config/Firebase";

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    // borderTopLeftRadius: '10px',
    // borderTopRightRadius: '10px',
  },
  body: {
    fontSize: 14,
    borderBottom: 'none',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      border: 'none',
  },
}))(TableRow);

const SilentBiddingHelper = ({ player, playerId, teamId }) => {
  const [biddingValue, setbiddingValue] = useState(parseInt(player.baseprice));

  const sendBid = (e) => {
    e.preventDefault();
    db.collection("players")
      .doc(player.name)
      .collection("Bids")
      .doc(teamId)
      .update(
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
  return (
    <>
      <StyledTableRow>
        <StyledTableCell style={{color:'white'}}>{player.name}</StyledTableCell>
        <StyledTableCell style={{color:'white'}}>{player.Runs}</StyledTableCell>
        <StyledTableCell style={{color:'white'}}>{player.Batavg}</StyledTableCell>
        <StyledTableCell style={{color:'white'}}>{player.strikerate}</StyledTableCell>
        <StyledTableCell style={{color:'white'}}></StyledTableCell>
        <StyledTableCell style={{color:'white'}}></StyledTableCell>
        <StyledTableCell style={{color:'white'}}></StyledTableCell>
        <StyledTableCell style={{color:'white'}}>₹ {player.baseprice}</StyledTableCell>
        <StyledTableCell style={{color:'white'}}>₹ {player.maxbid}</StyledTableCell>
        <StyledTableCell style={{color:'white'}}>
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
