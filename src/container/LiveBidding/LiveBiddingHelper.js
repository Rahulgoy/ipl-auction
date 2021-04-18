import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import firebase from "firebase";
import BiddingHistory from "./BiddingHistory";
const LiveBiddingHelper = ({ player, playerId, teamId }) => {
  const [biddingValue, setbiddingValue] = useState(player.maxbid);
  const [bidDisplay, setbidDisplay] = useState([]);
  const [teamBids, setteamBids] = useState(null);

  const sendBid = (e) => {
    e.preventDefault();
    ///Set bid to database

    /* db.collection("players")
      .doc(playerId)
      .collection("Bids")
      .doc(teamId)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          snapshot.data().bid.map((b) => {
            if (teamBids === null) {
              setteamBids([b]);
              // console.log("bid", b);
            } else {
              teamBids.map((bi) => {
                if (bi.biddingprice !== b.biddingprice) {
                  console.log(bi.biddingprice !== b.biddingprice);
                  console.log("bi:", bi.biddingprice);
                  console.log("b:", b.biddingprice);
                  setteamBids([...teamBids, b]);
                }
              });
            }
          });
        }
      }); */

    if (teamBids !== null) {
      setteamBids([
        {
          biddingprice: biddingValue,
          timestamp: firebase.firestore.Timestamp.now(),
        },
        ...teamBids,
      ]);
    } else {
      setteamBids([
        {
          biddingprice: biddingValue,
          timestamp: firebase.firestore.Timestamp.now(),
        },
      ]);
    }
    if (teamBids !== null) {
      db.collection("players")
        .doc(playerId)
        .collection("Bids")
        .doc(teamId)
        .set({
          bid: teamBids,
        });
    }

    console.log("Maxbid:", player.maxbid);
    console.log("Price:", biddingValue);
    if (player.maxbid < biddingValue) {
      db.collection("players").doc(playerId).update({
        maxbid: biddingValue,
        maxbidBy: teamId,
      });
    }
    if (biddingValue < 200 && biddingValue >= 20)
      setbiddingValue(biddingValue + 10);
    else if (biddingValue < 500 && biddingValue >= 200)
      setbiddingValue(biddingValue + 20);
    else setbiddingValue(biddingValue + 25);
  };
  console.log(teamBids);
  // console.log("ID:", playerId);
  useEffect(() => {
    //fetch bids from database
    db.collection("players")
      .doc(playerId)
      .collection("Bids")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.exists) {
            doc.data().bid.map((b) => {
              // console.log(doc.id);
              // console.log("bid:", b);
              setbidDisplay([
                {
                  id: doc.id,
                  biddingprice: b.biddingprice,
                  timestamp: b.timestamp,
                },
                ...bidDisplay,
              ]);
            });
          }
        });
      });
  }, []);
  // console.log(bidDisplay);
  // console.log(teamBids);
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
      {bidDisplay !== null
        ? bidDisplay.map((bid) => {
            return (
              // console.log("bid:", bid),
              <BiddingHistory key={bid.id ? bid.id : 0} bid={bid} />
            );
          })
        : console.log("No bids")}
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
