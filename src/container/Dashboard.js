import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { teamStats } from "../store/actions/playerActions";
import { db } from "../config/Firebase";
import General from "./Dashboards/General";

const Dashboard = ({ auth }) => {
  const [team, setTeam] = useState([]);

  const fetchTeam = async () => {
    db.collection("users").onSnapshot((snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      result.map((res) => {
        if (res.id === auth.uid) {
          console.log(parseInt(res.data.teamBalance));
          console.log(typeof res.data.teamBalance);
          setTeam(res.data);
        }
      });
      console.log(team);
    });
  };

  useEffect(() => {
    fetchTeam();
  }, []);
  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div>
      <h1>{auth.uid}</h1>
      <General player={team} />
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
