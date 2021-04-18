import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { teamStats } from "../store/actions/playerActions";
import { db } from "../config/Firebase";
import General from "./Dashboards/General";

import { Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import PlayerSection from "./Dashboards/PlayerSection";

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
    },
  },
});

const Dashboard = ({ auth }) => {
  const [team, setTeam] = useState(null);

  const fetchTeam = () => {
    db.collection("users").onSnapshot((snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      result.map((res) => {
        if (res.id === auth.uid) {
          // console.log(res.data.teamBalance);
          // console.log(typeof res.data.teamBalance);
          setTeam(res.data);
        }
      });
    });
  };
  console.log(team);
  if (team === null) console.log("NULL");
  useEffect(() => {
    fetchTeam();
  }, []);
  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div>
      {/* {<Typography variant="h4" style={{ color: "blue" }}>
        {" "}
        {auth.uid}{" "}}
      </Typography> */}
      {team === null ? console.log("No team") : <General player={team} />}
      <PlayerSection />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

/* const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
}; */

export default connect(mapStateToProps)(Dashboard);
