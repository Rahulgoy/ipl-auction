import React, { useState, useEffect } from "react";
import { db } from "../../config/Firebase";

import { connect } from "react-redux";
import SilentBiddingHelper from "./SilentBiddingHelper";

import { withStyles, makeStyles } from '@material-ui/core/styles';

import {
  Container,
  Table,
  TableBody,  
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell
} from "@material-ui/core";



import BlurredImage from "../../assets/img/BlurredImage.png";
import { Redirect } from "react-router";


// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

const SilentBidding = ({ auth, playerB }) => {
  const [silentPlayers, setSilentPlayers] = useState([]);

  const [playerId, setplayerId] = useState("");

  const fetchSilent = () => {
    /* db.collection("players")
      .where("category", "==", "silent")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setplayerId(doc.id);

          console.log(doc.id, "=>", doc.data());
          setSilentPlayers((silentPlayers) => [
            ...silentPlayers,
            { id: doc.id, data: doc.data() },
          ]);
        });
      }); */

    db.collection("players")
      .where("category", "==", "silent")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setplayerId(doc.id);

          console.log(doc.id, "=>", doc.data());
          setSilentPlayers((silentPlayers) => [
            ...silentPlayers,
            { id: doc.id, data: doc.data() },
          ]);
        });
      })
      .catch((error) => {
        console.log("Could not fetch");
      });
  };

  console.log(silentPlayers);
  /* let arr = Object.entries(silentPlayers);
  console.log("Arr:", arr); */
  useEffect(() => {
    console.log("Working....");

    fetchSilent();
  }, []);
  if (!auth.uid) return <Redirect to="/signin" />;


  return (
<>
    <h1 style={{color:'white'}}>Silent</h1>
    <Container>
    <div className='wrapper'>
      <div >
          {/* <img src={BlurredImage} style={{backgroundRepeat: 'cover'}}></img> */}
          <div className='backText'>
       
        </div>
      </div>

    <TableContainer component={Paper}>
      {/* <Table className={classes.table}> */}
      <Table>
        <TableHead stickyHeader>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell>Runs</TableCell>
            <TableCell>Batting Avg</TableCell>
            <TableCell>Strike Rate</TableCell>
            <TableCell>Wickets</TableCell>
            <TableCell>Bowling Avg</TableCell>
            <TableCell>Economy</TableCell>
            <TableCell>Baseprice</TableCell>
            <TableCell>Max Bid</TableCell>
            <TableCell>Place Bid</TableCell>
          </TableRow>
        </TableHead>


        <TableBody>
        {silentPlayers.map((player) => {
                return player ? (
                  <SilentBiddingHelper
                    key={player.id}
                    player={player.data}
                    playerId={playerId}
                    teamId={auth.uid}
                  />
                ) : (
                  console.log("No player")
                );
              })}
        </TableBody>
      </Table>
    </TableContainer>




    </div>
    </Container>
</>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    playerB: state.playerB,
  };
};

export default connect(mapStateToProps)(SilentBidding);
