import React, { useState } from "react";
import { Bids } from "../store/actions/playerActions";
import { connect } from "react-redux";
const SilentBiddingHelper = ({ player, playerId }) => {
  const [nextBid, setnextBid] = useState(0);
  console.log(player);
  return (
    <>
      <h1>{playerId}</h1>
      <tr>
        <td>{player.name}</td>
        <td>{player.Runs}</td>
        <td>{player.Batavg}</td>
        <td>{player.strikerate}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>{player.baseprice}</td>

        <td>
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
        </td>
      </tr>
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
