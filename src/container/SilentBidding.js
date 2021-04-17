import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import { Bids } from "../store/actions/playerActions";
import { connect } from "react-redux";
import SilentBiddingHelper from "./SilentBiddingHelper";

const SilentBidding = ({ auth, playerB }) => {
  const [silentPlayers, setSilentPlayers] = useState([]);

  const [playerId, setplayerId] = useState(0);

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

  return (
    <div>
      <h1>Silent</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Runs</th>
          <th>Batting Avg</th>
          <th>StrikeRate</th>
          <th>Wickets</th>
          <th>Bowling Avg</th>
          <th>Economy</th>
          <th>Baseprice</th>
          <th>Place Bid</th>
        </tr>
        {silentPlayers.map((player) => {
          return (
            <SilentBiddingHelper
              key={player.id}
              player={player.data}
              playerId={playerId}
            />
          );
        })}
      </table>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(SilentBidding);
