import {
  Select,
  TextField,
  Button,
  Box,
  Grid,
  CssBaseline,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import React, { Component, useState } from "react";
import { db } from "../../config/Firebase";
import { connect } from "react-redux";
import { AddPlayer } from "../../store/actions/authActions";
import { Redirect } from "react-router";
const formAlignStyle = {
  //   backgroundColor: "#010202",
  height: "100vh",
  paddingTop: "40px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "relative",
};

class PlayerForm extends Component {
  //const PlayerForm = ({ auth, authError }) => {
  state = {
    name: "",
    age: "",
    baseprice: 0,
    Batavg: "",
    Image: "",
    Runs: "",
    strikerate: "",
    Bowlavg: "",
    wickets: "",
    economy: "",
    category: "",
    display: "",
    status: "",
    maxbid: 0,
    maxbidBy: "",
    team: "",
    class: "",
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.AddPlayer(this.state);
  };
  //   console.log(AddPlayer);
  /* const addPlayer = (player) => {
    console.log(player.name);
    db.collection("players").doc(player.name).set({
      name: player.name,
      age: player.age,
      baseprice: player.baseprice,
      Batavg: player.Batavg,
      Image: player.Image,
      Runs: player.Runs,
      strikerate: player.strikerate,
      Bowlavg: player.Bowlavg,
      wickets: player.wickets,
      economy: player.economy,
      category: player.category,
      display: player.display,
      status: player.status,
      maxbid: player.maxbid,
      maxbidBy: player.maxbidBy,
      team: player.team,
      class: player.class,
    });
  }; */
  render() {
    const { authError, auth } = this.props;
    if (auth.uid !== "zZfVKoYwMWURII0q8tmvK6rvXvi1") return <Redirect to="/" />;
    return (
      <div>
        <CssBaseline />
        <form onSubmit={this.handleSubmit}>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                label="name"
                name="name"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                type="text"
                id="name"
                onChange={this.handleChange}
              />

              <TextField
                variant="outlined"
                margin="normal"
                name="age"
                label="Age"
                fullWidth
                id="age"
                type="text"
                onChange={this.handleChange}
              />

              {/* First Name */}
              <TextField
                variant="outlined"
                margin="normal"
                name="baseprice"
                label="Base Price"
                required
                fullWidth
                id="baseprice"
                type="number"
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                name="Batavg"
                label="Bat Avg"
                fullWidth
                id="Batavg"
                type="text"
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                name="Image"
                label="Image"
                fullWidth
                id="Image"
                type="text"
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                name="Runs"
                label="Runs"
                fullWidth
                id="Runs"
                type="text"
                onChange={this.handleChange}
              />

              <TextField
                variant="outlined"
                margin="normal"
                name="strikerate"
                label="strikerate"
                fullWidth
                id="strikerate"
                type="text"
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                name="Bowlavg"
                label="Bowlavg"
                fullWidth
                id="Bowlavg"
                type="text"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Box>
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="wickets"
                  label="Wickets"
                  fullWidth
                  id="wickets"
                  type="text"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="economy"
                  label="economy"
                  fullWidth
                  id="economy"
                  type="text"
                  onChange={this.handleChange}
                />

                <InputLabel id="demo-simple-select-filled-label">
                  category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="category"
                  name="category"
                  label="category"
                  onChange={this.handleChange}
                >
                  <MenuItem value={"live"}>live</MenuItem>
                  <MenuItem value={"silent"}>silent</MenuItem>
                </Select>
                <InputLabel id="demo-simple-select-filled-label">
                  display
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="display"
                  name="display"
                  label="display"
                  onChange={this.handleChange}
                >
                  <MenuItem value={"true"}>true</MenuItem>
                  <MenuItem value={"false"}>false</MenuItem>
                </Select>
                <InputLabel id="demo-simple-select-filled-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="status"
                  name="status"
                  label="status"
                  onChange={this.handleChange}
                >
                  <MenuItem value={"open"}>open</MenuItem>
                  <MenuItem value={"close"}>close</MenuItem>
                </Select>

                <TextField
                  variant="outlined"
                  margin="normal"
                  name="maxbid"
                  label="maxbid"
                  fullWidth
                  id="maxbid"
                  type="number"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="maxbidBy"
                  label="maxbidBy"
                  fullWidth
                  id="maxbidBy"
                  type="text"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="team"
                  label="team"
                  fullWidth
                  id="team"
                  type="text"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="class"
                  label="class"
                  fullWidth
                  id="class"
                  type="text"
                  onChange={this.handleChange}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{
                margin: "24px 0px 16px",
              }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>

          <div className="center red-text">
            {authError ? <p>{authError}</p> : null}
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AddPlayer: (player) => dispatch(AddPlayer(player)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);
