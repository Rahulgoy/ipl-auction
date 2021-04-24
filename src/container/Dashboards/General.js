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
      
      <Typography color='primary' className='userTeamName' variant='h5'>{player.teamName}</Typography>

      <Typography color='secondary' variant='h5'>{player.initials}</Typography>

      <Typography color='secondary' variant='h5'>
        {player.teamBalance ? player.teamBalance / 100 : "No Balance"}Cr
      </Typography>
    </div>
  );
};

export default General;
