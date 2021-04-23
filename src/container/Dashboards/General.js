import React from "react";
import PlayerSection from "./PlayerSection";

import {Typography} from '@material-ui/core';
import '../../assets/css/dashboard.css';

const General = ({ player }) => {
  console.log(player);
  console.log(player.teamBalance);
  return (

    // team details on left 
    <div className='userTeamDetails'>
      
      <Typography style={{ color:'goldenrod' }} className='userTeamName' variant='h3'>{player.teamName}</Typography>

      <Typography >{player.initials}</Typography>

      <Typography style={{ color: "goldenrod" }}>
        {player.teamBalance ? player.teamBalance / 100 : "No Balance"}Cr
      </Typography>
    </div>
  );
};

export default General;
