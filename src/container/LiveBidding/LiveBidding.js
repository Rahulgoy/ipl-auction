import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { db } from "../../config/Firebase";
import LiveBiddingHelper from "./LiveBiddingHelper";

const LiveBidding = ({ auth }) => {
  const [play, setPlay] = useState({});
  const [playerId, setPlayerId] = useState("admin");

  const fetchsome = () => {
    db.collection("players")
      .where("display", "==", "true")
      .where("category", "==", "live")
      .where("status", "==", "open")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          // console.log(doc.id, "=>", doc.data());
          setPlay(doc.data());
          setPlayerId(doc.id);
        });
      });
  };

  /*  const fetchsome = () => {
    db.collection("players")
      .where("display", "==", "true")
      .where("category", "==", "live")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // console.log(doc.id, "=>", doc.data());
          setPlay(doc.data());
          setPlayerId(doc.id);
        });
      })
      .catch((error) => {
        console.log("Could not fetch");
      });
  }; */
  console.log(play);

  useEffect(() => {
    console.log("Working....");
    fetchsome();
  }, []);

  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div>
      {play !== null && playerId !== "admin" ? (
        <LiveBiddingHelper
          player={play}
          playerId={playerId}
          teamId={auth.uid}
        />
      ) : (
        <h1>No Player to Bid</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

/* const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
}; */

export default connect(mapStateToProps)(LiveBidding);
