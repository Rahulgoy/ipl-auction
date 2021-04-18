import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import firebase from "firebase";

const BiddingHistory = ({ bid }) => {
  const [team, setTeam] = useState({});
  const fetchUser = () => {
    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.id === bid.id) {
          console.log("Doc:", doc.id, "  Bid:", bid.id);
          setTeam(doc.data());
        }
      });
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  console.log("team:", team);
  return (
    <div>
      <p>{team.initials}</p>
      <p>{bid.biddingprice}</p>
    </div>
  );
};

export default BiddingHistory;
