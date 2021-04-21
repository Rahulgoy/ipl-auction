import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import firebase from "firebase";
import BiddingHistory from "./BiddingHistory";
import { Grid } from "@material-ui/core";

import FlipMove from "react-flip-move";
const LiveBiddingHelper = ({ player, playerId, teamId }) => {
  const [biddingValue, setbiddingValue] = useState(parseInt(player.maxbid));
  const [bidDisplay, setbidDisplay] = useState([]);
  const [balance, setBalance] = useState(0);
  //console.log(teamId);

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
      .onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
        snapshot.docs.map((doc) => {
          // console.log(doc.id, "=>", doc.data());

          if (
            parseInt(doc.data().baseprice) === parseInt(doc.data().maxbid) &&
            player.maxbidBy === ""
          ) {
            console.log("equal");
            // setbiddingValue(parseInt(doc.data().baseprice));
          } else if (
            parseInt(doc.data().baseprice) === parseInt(doc.data().maxbid) &&
            player.maxbidBy !== ""
          ) {
            if (
              parseInt(doc.data().maxbid) < 500 &&
              parseInt(doc.data().maxbid) >= 200
            ) {
              setbiddingValue(parseInt(doc.data().maxbid) + 20);
            }
          } else {
            if (
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

    /*  if (parseInt(player.baseprice) === parseInt(player.maxbid)) {
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
    }*/
  }, [player.maxbidBy]);
  useEffect(() => {
    db.collection("users")
      .doc(teamId)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setBalance(parseInt(snapshot.data().teamBalance));
        }
      });
  }, []);
  useEffect(() => {
    //fetch bids from database
    db.collection("players")
      .doc(playerId)
      .collection("Bids")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setbidDisplay(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, [player.maxbid]);

  console.log(bidDisplay);
  // console.log(biddingValue);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={6} display="inline">
        <h2>
          {player.name}({player.age})
        </h2>
        <img src={player.Image} alt="No Image" height="500px"></img>
        <Grid item xs={3}>
          <p>Runs: {player.Runs}</p>
          <p>Batting Average: {player.Batavg}</p>
          <p>Strike Rate: {player.strikerate}</p>
        </Grid>
        <Grid item xs={3}>
          <p>Wickets: {player.wickets}</p>
          <p>Economy: {player.economy}</p>
          <p>Bowling Average: {player.Bowlavg}</p>
          <p>Rating: {player.rating}</p>
        </Grid>
        <p>Base Price: {player.baseprice} lakhs</p>
        {/* {player.maxbidBy === teamId ? <h3>WINNING</h3> : console.log("False")} */}
        <form>
          {balance >= biddingValue ? (
            [
              player.maxbidBy !== teamId ? (
                <button type="submit" onClick={sendBid}>
                  <p>{biddingValue}</p>Bid
                </button>
              ) : (
                <button type="submit" disabled>
                  <p>{biddingValue}</p>Bid
                </button>
              ),
            ]
          ) : (
            <button disabled>
              <p>Not Enough Balance</p>
            </button>
          )}
        </form>
      </Grid>
      <Grid item xs={6}>
        <FlipMove>
          {bidDisplay ? (
            bidDisplay.map((bid) => {
              return <BiddingHistory key={bid.id} bid={bid.data} />;
            })
          ) : (
            <h1>No bids</h1>
          )}
        </FlipMove>
      </Grid>
    </Grid>
  );
};

export default LiveBiddingHelper;

/*  useEffect(() => {
    db.collection("players")
      .where("category", "==", "live")
      .where("status", "==", "close")
      .onSnapshot((snapshot)=>{
        if(snapshot.exists){
          snapshot.doc.for
        }
      })



    if (player.status === "close") {
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
    }
  }, [player.status]); */
