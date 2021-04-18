import React, { useState } from "react";
import { Bids } from "../store/actions/playerActions";
import { connect } from "react-redux";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';


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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    
  },
}))(TableRow);


const SilentBiddingHelper = ({ player, playerId }) => {
  const [nextBid, setnextBid] = useState(0);
  console.log(player);
  return (
    <>
      {/* <h1>{playerId}</h1> */}
      <StyledTableRow>
        <StyledTableCell>{player.name}</StyledTableCell>
        <StyledTableCell>{player.Runs}</StyledTableCell>
        <StyledTableCell>{player.Batavg}</StyledTableCell>
        <StyledTableCell>{player.strikerate}</StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell>{player.baseprice}</StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell>
          <form>
              <input
                value={nextBid}
                onChange={(event) => {
                  event.preventDefault();
                  setnextBid(event.target.value);
                }}
              />
              <button type="submit" onClick={Bids(playerId, nextBid)}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    Bids: (playerId, biddingprice) => dispatch(Bids(playerId, biddingprice)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SilentBiddingHelper);
