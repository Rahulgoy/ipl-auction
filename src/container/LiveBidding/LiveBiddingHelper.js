import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import firebase from "firebase";
import BiddingHistory from "./BiddingHistory";
import { Grid } from "@material-ui/core";
const LiveBiddingHelper = ({ player, playerId, teamId }) => {
  const [biddingValue, setbiddingValue] = useState(parseInt(player.baseprice));
  const [bidDisplay, setbidDisplay] = useState([]);

  const sendBid = (e) => {
    e.preventDefault();

    db.collection("players").doc(playerId).collection("Bids").add({
      teamId: teamId,
      biddingprice: biddingValue,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    //console.log("Maxbid:", player.maxbid);
    //console.log("Price:", biddingValue);
    if (
      parseInt(player.maxbid) < parseInt(biddingValue) ||
      parseInt(player.maxbid) === parseInt(player.baseprice)
    ) {
      db.collection("players").doc(playerId).update({
        maxbid: biddingValue,
        maxbidBy: teamId,
      });
    }
    //const ref2 = db.collection("players").doc(playerId);
    if (parseInt(biddingValue) < 200 && parseInt(biddingValue) >= 20)
      setbiddingValue(parseInt(biddingValue) + 10);
    else if (parseInt(biddingValue) < 500 && parseInt(biddingValue) >= 200) {
      setbiddingValue(parseInt(biddingValue) + 20);
    } else {
      setbiddingValue(parseInt(biddingValue) + 25);
    }
  };

  // console.log("ID:", playerId);
  useEffect(() => {
    ///setting bidding value
    db.collection("players")
      .where("display", "==", "true")
      .where("category", "==", "live")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          // console.log(doc.id, "=>", doc.data());

          if (parseInt(doc.data().baseprice) === parseInt(doc.data().maxbid)) {
            setbiddingValue(parseInt(doc.data().baseprice));
          } else {
            if (
              parseInt(doc.data().maxbid) < 200 &&
              parseInt(doc.data().maxbid) >= 20
            )
              setbiddingValue(parseInt(doc.data().maxbid) + 10);
            else if (
              parseInt(doc.data().maxbid) < 500 &&
              parseInt(doc.data().maxbid) >= 200
            ) {
              setbiddingValue(parseInt(doc.data().maxbid) + 20);
            } else {
              setbiddingValue(parseInt(doc.data().maxbid) + 25);
            }
          }
        });
      });
  }, []);
  useEffect(() => {
    //fetch bids from database
    db.collection("players")
      .doc(playerId)
      .collection("Bids")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setbidDisplay(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  //console.log(bidDisplay);
  //console.log(biddingValue);

  return (
    <Grid container spacing={3}>
      <Grid item sm>
        <h2>
          {player.name}({player.age})
        </h2>
        <img src={player.Image} alt="No Image" height="500px"></img>
        <span>
          <p>Runs: {player.Runs}</p>
          <p>Batting Average: {player.Batavg}</p>
          <p>Strike Rate: {player.strikerate}</p>
          <p>Base Price: {player.baseprice} lakhs</p>
        </span>
        <span>
          <p>Wickets: {player.wickets}</p>
          <p>Economy: {player.economy}</p>
          <p>Bowling Average: {player.Bowlavg}</p>
        </span>
        {/* {player.maxbidBy === teamId ? <h3>WINNING</h3> : console.log("False")} */}
        <form>
          <button type="submit" onClick={sendBid}>
            <p>{biddingValue}</p>Bid
          </button>
        </form>
      </Grid>
      <Grid item sm>
        {bidDisplay
          ? bidDisplay.map((bid) => {
              return <BiddingHistory key={bid.id ? bid.id : 0} bid={bid} />;
            })
          : console.log("No bids")}
      </Grid>
    </Grid>
  );
};

export default LiveBiddingHelper;
