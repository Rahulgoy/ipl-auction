import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import firebase from "firebase";
import BiddingHistory from "./BiddingHistory";
import FlipMove from "react-flip-move";

import {
  Button,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import '../../assets/css/liveBidding.css';
import {makeStyles} from '@material-ui/core';
import theme from "../../assets/js/DarkTheme";

const useStyles = makeStyles({
  leftGrid: {
    padding: '20px',

  },
  playerDetailsWrapper: {

  },
  playerDetails: {
    color: '#1B2C89', // blue
    color: '#D7A864', // golden
    fontWeight: '700',
    marginBottom: '20px',
    fontSize: '1.5em',

  },
  bidSection: {
      marginTop: '20px',
      
  },
  bidButton: {
    marginTop: '30px',
    backgroud: theme.palette.primary,
    border: '2px solid black',
    padding: '20px',
    borderRadius: '20px',
  },

}); 

const LiveBiddingHelper = ({ player, playerId, teamId }) => {
  const classes = useStyles();

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
    <Container>

      <Grid container justify="center" spacing={3}>

      <Grid item xs={6} display="inline">
      <div className={classes.leftGrid}>
        
        <Typography variant='h2' align='center' color='primary' style={{
            fontWeight: 'bold',
            fontStyle: 'normal',
            fontSize: '3em'
        }}> 
          {player.name}({player.age})
        </Typography>
        <div style={{
              marginTop: '30px', 
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',     
        }}>

          <img src={player.Image} alt="No Image" height="400px" width="300px" style={{
              // margin: '0 auto'
              marginLeft: '-10%'
          }}></img> 

          <div style={{
              display: 'block',
              justifyContent: 'space-around',
            }} className={classes.playerDetailsWrapper}
          >
            {/* <Grid item xs={3}> */}
              <div>
                <Typography className={classes.playerDetails}> Runs: {player.Runs}</Typography>
                <Typography className={classes.playerDetails}> Batting Average: {player.Batavg}</Typography>
                <Typography className={classes.playerDetails}> Strike Rate: {player.strikerate}</Typography>
              </div>

            {/* </Grid> */}
            {/* <Grid item xs={3}> */}
            
            <div>
              <Typography className={classes.playerDetails}> Wickets: {player.wickets}</Typography>
              <Typography className={classes.playerDetails}> Economy: {player.economy}</Typography>
              <Typography className={classes.playerDetails}> Bowling Average: {player.Bowlavg}</Typography>
              <Typography className={classes.playerDetails}> Rating: {player.rating}</Typography>
            </div>
          </div>
          {/* </Grid> */}
        </div>

        <div className={classes.bidSection}>
          <Typography color='primary' variant='h5'> Base Price: {player.baseprice} Lakhs </Typography>
          {/* {player.maxbidBy === teamId ? <h3>WINNING</h3> : console.log("False")} */}
          <form>
            {balance >= biddingValue ? (
              [
                player.maxbidBy !== teamId ? (
                  <button type="submit" onClick={sendBid} className={classes.bidButton}>
                     <Typography variant='h6'>{biddingValue}L Bid </Typography>
                  </button>
                ) : (
                  <button type="submit" disabled className={classes.bidButton}>
                    <Typography variant='h6'>{biddingValue}L Bid </Typography>
                  </button>
                ),
              ]
            ) : (
              <button disabled>
                <p>Not Enough Balance</p>
              </button>
            )}
          </form>
        </div>
      </div>
      </Grid>
      

      
        <Grid item xs={6}>
          <Container className={classes.rightGrid} style={{backgroundColor: 'white', marginTop: '100px', padding: '50px'}}>
              <FlipMove>
              {bidDisplay ? (
                bidDisplay.map((bid) => {
                  return <BiddingHistory key={bid.id} bid={bid.data} />;
                })
              ) : (
                <h1>No bids</h1>
              )}
            </FlipMove>
          </Container>
        </Grid>
      

    </Grid>
    </Container>
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
