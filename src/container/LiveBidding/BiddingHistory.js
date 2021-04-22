import React, { forwardRef, useEffect, useLayoutEffect, useState } from "react";
import { db } from "../../config/Firebase";
import firebase from "firebase";
import {
  Button,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import '../../assets/css/biddingHistory.css';

const useStyles = makeStyles({

}); 

import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
});
const BiddingHistory = forwardRef(({ bid }, ref) => {
  const classes = useStyles();
  // console.log(bid);
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
    <table className='historyTable' ref={ref}>
      <tr>

        <div className='biddingHistorySection'>
          <Typography variant='h5' style={{marginRight:'10px', color: '#fff', fontWeight: '700'}} className='teamNameOnLeft'> {team.teamName}: </Typography>
          <Typography variant='h5' className='bidOnRight'> {bid.biddingprice} Lakhs</Typography>

        <div>
          <td>
            {" "}
            <Typography
              variant="h6"
              style={{ marginRight: "10px", color: "#D7A864" }}
            >
              {" "}
              {team.teamName}:{" "}
            </Typography>
          </td>
          <td>
            {" "}
            <Typography variant="h6"> {bid.biddingprice}</Typography>
          </td>

        </div>
      </tr>
    </table>
  );
});

export default BiddingHistory;
