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
  };
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
        console.log("No play")
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

/* const [playerCard, setPlayerCard] = useState({
    Batavg: "",
    Image: "",
    Runs: "",
    age: "",
    baseprice: "",
    class: "",
    display: Boolean,
    maxbid: 0,
    maxbidBy: "",
    name: "",
    strikerate: "",
  }); */

/* const fetchCard = () => {
    db.collection("players").onSnapshot((snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      result.map((res) => {
        console.log(res.data.display);
        if (res.data.display === true) {
          console.log(res.data);
          console.log(res.data.name);
          setPlayerCard({
            Batavg: res.data.Batavg,
            Image: res.data.Image,
            Runs: res.data.Runs,
            age: res.data.age,
            baseprice: res.data.baseprice,
            class: res.data.class,
            display: res.data.display,
            maxbid: res.data.maxbid,
            maxbidBy: res.data.maxbidBy,
            name: res.data.name,
            strikerate: res.data.strikerate,
          });
        }
      });
      console.log(playerCard);
    });
  }; */
