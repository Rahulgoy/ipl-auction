import React, { forwardRef, useEffect, useLayoutEffect, useState } from "react";
import { db } from "../../config/Firebase";
import firebase from "firebase";

const BiddingHistory = forwardRef(({ bid }, ref) => {
  console.log(bid);
  const [team, setTeam] = useState({
    teamName: "",
    initials: "",
  });
  const fetchUser = () => {
    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        //console.log("Doc:", doc.id, "  Bid:", bid.teamId);
        if (doc.id === bid.teamId) {
          //console.log("Doc:", doc.id, "  Bid:", bid.teamId);
          //console.log(doc.data());
          //console.log(bid);

          setTeam({
            teamName: doc.data().teamName,
            initials: doc.data().initials,
          });
        }
      });
    });
  };
  useLayoutEffect(() => {
    fetchUser();
  }, [bid]);
  //console.log("team:", team);
  return (
    <table ref={ref}>
      <tr>
        <td>{team.initials}</td>
        <td>{bid.biddingprice}</td>
      </tr>
    </table>
  );
});

export default BiddingHistory;
