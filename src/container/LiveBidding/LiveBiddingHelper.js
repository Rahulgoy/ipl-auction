import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import firebase from "firebase";
import BiddingHistory from "./BiddingHistory";
import { Grid } from "@material-ui/core";
const LiveBiddingHelper = ({ player, playerId, teamId }) => {
  const [biddingValue, setbiddingValue] = useState(parseInt(player.maxbid));
  const [bidDisplay, setbidDisplay] = useState([]);
  const [teamBids, setteamBids] = useState(null);

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
  console.log(teamBids);
  // console.log("ID:", playerId);
  useEffect(() => {
    ///setting bidding value

    if (player.baseprice === player.maxbid) {
      setbiddingValue(parseInt(player.baseprice));
    } else {
      if (parseInt(player.maxbid) < 200 && parseInt(player.maxbid) >= 20)
        setbiddingValue(parseInt(player.maxbid) + 10);
      else if (
        parseInt(player.maxbid) < 500 &&
        parseInt(player.maxbid) >= 200
      ) {
        setbiddingValue(parseInt(player.maxbid) + 20);
      } else {
        setbiddingValue(parseInt(player.maxbid) + 25);
      }
    }
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
  // console.log(teamBids);
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
        <form>
          <button type="submit" onClick={sendBid}>
            <p>{biddingValue}</p>Bid
          </button>
        </form>
      </Grid>
      <Grid item sm>
        {bidDisplay
          ? bidDisplay.map((bid) => {
              return (
                console.log("bid:", bid),
                (<BiddingHistory key={bid.id ? bid.id : 0} bid={bid} />)
              );
            })
          : console.log("No bids")}
      </Grid>
    </Grid>
  );
};

export default LiveBiddingHelper;
