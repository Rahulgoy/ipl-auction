import React, { useState, useEffect } from "react";
import { db } from "../../config/Firebase";
import { Bids } from "../../store/actions/playerActions";
import { connect } from "react-redux";
import SilentBiddingHelper from "./SilentBiddingHelper";

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import BlurredImage from '../../assets/img/BlurredImage.png';

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderBottom: 'none',
  },
  body: {
    color: theme.palette.common.white,
    borderBottom: 'none',
  }

}))(TableCell);

const SilentBidding = ({ auth, playerB }) => {
  const [silentPlayers, setSilentPlayers] = useState([]);

  const [playerId, setplayerId] = useState("");

  const fetchSilent = () => {
    db.collection("players")
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
      });

    /* db.collection("players")
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
      }); */
  };

  console.log(silentPlayers);
  /* let arr = Object.entries(silentPlayers);
  console.log("Arr:", arr); */
  useEffect(() => {
    console.log("Working....");

    fetchSilent();
  }, []);
  
  return (
    <Container>
      <h1 style={{color:'white'}}>Silent</h1>

      <div className='tableWrapper'>
        <div className='black'>
            {/* <img src={BlurredImage} style={{backgroundRepeat: 'cover'}}></img> */}
            <div className='backText'>
              <TableContainer>
                <Table className='table' aria-label="customized table">
                  <TableHead stickyHeader>
                    <TableRow className='tableHeaderRow'>
                      <StyledTableCell >Name</StyledTableCell>
                      <StyledTableCell>Runs</StyledTableCell>
                      <StyledTableCell>Batting Avg</StyledTableCell>
                      <StyledTableCell>Strike Rate</StyledTableCell>
                      <StyledTableCell>Wickets</StyledTableCell>
                      <StyledTableCell>Bowling Avg</StyledTableCell>
                      <StyledTableCell>Economy</StyledTableCell>
                      <StyledTableCell>Baseprice</StyledTableCell>
                      <StyledTableCell>Max Bid</StyledTableCell>
                      <StyledTableCell>Place Bid</StyledTableCell>
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
        </div>
      </div>
    </Container>
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
