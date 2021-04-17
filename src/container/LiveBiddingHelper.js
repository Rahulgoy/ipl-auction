import React, { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import firebase from "firebase";
import BiddingHistory from "./BiddingHistory";
const LiveBiddingHelper = ({ player, playerId, teamId }) => {
  const [biddingValue, setbiddingValue] = useState(
    320 /* parseInt(player.baseprice) */
  );
  const [bidDisplay, setbidDisplay] = useState([]);

  const sendBid = (e) => {
    e.preventDefault();

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
    console.log("Maxbid:", player.maxbid);
    console.log("Price:", biddingValue);
    if (player.maxbid < biddingValue) {
      db.collection("players").doc(playerId).update({
        maxbid: biddingValue,
        maxbidBy: teamId,
      });
    }
    if (biddingValue < 300 && biddingValue >= 200)
      setbiddingValue(biddingValue + 10);
    else setbiddingValue(biddingValue + 20);
  };
  console.log("ID:", playerId);
  useEffect(() => {
    db.collection("players")
      .doc(playerId)
      .collection("Bids")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          doc.data().bid.map((b) => {
            // console.log(doc.id);
            console.log("bid:", b);
            setbidDisplay([
              {
                id: doc.id,
                biddingprice: b.biddingprice,
                timestamp: b.timestamp,
              },
              ...bidDisplay,
            ]);
          });
        });
      });
  }, []);
  console.log(bidDisplay);
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
      {bidDisplay.map((bid) => {
        return (
          console.log("bid:", bid),
          (<BiddingHistory key={bid.id ? bid.id : 0} bid={bid} />)
        );
      })}
    </div>
  );
};

export default LiveBiddingHelper;

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
