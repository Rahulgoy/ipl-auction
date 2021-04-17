import React, { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import firebase from "firebase";
const LiveBiddingHelper = ({ player, playerId, teamId }) => {
  const [biddingValue, setbiddingValue] = useState(320);
  console.log(player.baseprice);
  console.log(biddingValue);
  console.log(playerId);

  const sendBid = (e) => {
    e.preventDefault();

    /* const query = db
      .collection("players")
      .doc(playerId)
      .collection("Bids")
      .doc(teamId);

    query.get().then((snapshot) => {
      if (snapshot.exists) {
        query.add({
          bid: [
            {
              biddingprice: biddingValue,
              timestamp: firebase.firestore.Timestamp.now(),
            },
          ],
        });
      } else {
        query.set({
          bid: [
            {
              biddingprice: biddingValue,
              timestamp: firebase.firestore.Timestamp.now(),
            },
          ],
        });
      }
    }); */

    db.collection("players")
      .doc(playerId)
      .collection("Bids")
      .doc(teamId)
      .set(
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

    db.collection("players").doc(playerId).update({
      maxbid: biddingValue,
      maxbidBy: teamId,
    });

    if (biddingValue < 300 && biddingValue >= 200)
      setbiddingValue(biddingValue + 10);
    else setbiddingValue(biddingValue + 20);
  };

  useEffect(() => {
    /* db.collection("players").doc(playerId).collection("Bids"); */
  }, []);
  return (
    <div>
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
      <form>
        <button type="submit" onClick={sendBid}>
          <p>{biddingValue}</p>Bid
        </button>
      </form>
    </div>
  );
};

export default LiveBiddingHelper;
