import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import { Bids } from "../store/actions/playerActions";
import { connect } from "react-redux";
const SilentBidding = ({ auth, playerB }) => {
  const [silentPlayers, setSilentPlayers] = useState([]);
  const [nextBid, setnextBid] = useState(0);
  const [playerId, setplayerId] = useState(0);

  const fetchSilent = () => {
    db.collection("players")
      .where("category", "==", "live")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setplayerId(doc.id);

          console.log(doc.id, "=>", doc.data());
          setSilentPlayers({ id: doc.id, data: doc.data() });
        });
      })
      .catch((error) => {
        console.log("Could not fetch");
      });
  };
  console.log(playerId);
  console.log(silentPlayers);
  useEffect(() => {
    console.log("Working....");
    fetchSilent();
  }, []);

  return (
    <div>
      <h1>Silent</h1>
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
