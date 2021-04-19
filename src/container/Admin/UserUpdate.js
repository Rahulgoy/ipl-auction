import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import { withStyles, makeStyles } from "@material-ui/core/styles";

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
import AllTeams from "./AllTeams";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const UserUpdate = () => {
  const [teams, setTeams] = useState([]);

  const fetchTeam = () => {
    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //setplayerId(doc.id);

          //console.log(doc.id, "=>", doc.data());
          setTeams((teams) => [...teams, { id: doc.id, data: doc.data() }]);
        });
      })
      .catch((error) => {
        console.log("Could not fetch");
      });
  };

  useEffect(() => {
    fetchTeam();
  }, []);
  return (
    <Container>
      <h3>Live</h3>

      <div className="tableWrapper">
        <div className="black">
          {/* <img src={BlurredImage} style={{backgroundRepeat: 'cover'}}></img> */}
          <div className="backText">
            <TableContainer>
              <Table className="table" aria-label="customized table">
                <TableHead stickyHeader>
                  <TableRow>
                    <StyledTableCell>Team Name</StyledTableCell>
                    <StyledTableCell>Team Id</StyledTableCell>
                    <StyledTableCell>Balance</StyledTableCell>
                    <StyledTableCell>Update Balance</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {teams.map((team) => {
                    return team ? (
                      <AllTeams
                        key={team.id}
                        team={team}
                        //playerId={playerId}
                      />
                    ) : (
                      console.log("No Team")
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

export default UserUpdate;
