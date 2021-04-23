import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import Categories from "./Categories";
import Players from "./Players";

import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,  
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";



///
import "../../assets/css/dashboard.css";



// const theme = createMuiTheme({
//   palette: {

//     text: {
//       primary: "#000000",
//     },
//   },
// });


const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.primary,
  //   background: '#555555'
  // },


}));



const PlayerSection = ({ teamId }) => {
  const classes = useStyles();


  const [categories, setCategories] = useState([]);
  // let categories = [];
  const [team, setTeam] = useState([]);
  const [AllPlayers, setAllPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const fetchPlayers = () => {
    console.log("Fetching Players");
    db.collection("players").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        //console.log(doc.data());
        setAllPlayers((AllPlayers) => [
          ...AllPlayers,
          { id: doc.id, data: doc.data() },
        ]);
      });
    });
  };
  const fetchTeam = () => {
    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          if (categories === null) {
            setCategories({ id: doc.id, data: doc.data().teamName });
          } else {
            setCategories((categories) => [
              ...categories,
              {
                id: doc.id,
                data: doc.data().teamName,
              },
            ]);
          }
        });

        /* const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      result.map((res) => {
        console.log(res.data);
        // categories.push([res.data.teamName]);
      }); */
      });
  };
  const fetchDefault = () => {
    console.log("Fetching Players");
    db.collection("players").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        //console.log(doc.data());
        if (doc.data().team === teamId)
          setFilteredPlayers((filteredPlayers) => [
            ...filteredPlayers,
            { id: doc.id, data: doc.data() },
          ]);
      });
    });
  };

  const filterPlayers = (category, id) => {
    //console.log("C", id);

    const filterPlayers = AllPlayers.filter(
      (player) => player.data.team === id
    );
    setFilteredPlayers(filterPlayers);
  };
  //console.log(AllPlayers);

  useEffect(() => {
    fetchTeam();
    fetchPlayers();
    fetchDefault();
  }, []);

  console.log(filteredPlayers);
  return (
    <div>
      {categories === null ? (
        console.log("No category")
      ) : (
        <Categories filterPlayers={filterPlayers} categories={categories} />
      )}
      

      <Container>
        <div className={classes.wrapper}>
            {/* <img src={BlurredImage} style={{backgroundRepeat: 'cover'}}></img> */}
          <div className={classes.tableWrapper}>
        
            <TableContainer className={classes.container}>
              <Table className={classes.table} style={{borderRadius:'5px'}}>
                <Box borderRadius={10} border={1} borderColor='secondary'>
                <TableHead>

                    <TableCell> <Typography color='primary'>Name </Typography> </TableCell>
                    <TableCell> <Typography color='primary'>Highest Bid</Typography>  </TableCell>
                    <TableCell> <Typography color='primary'>Base Price </Typography> </TableCell>

                </TableHead>

                <TableBody style={{background: 'red'}} >
                    <Players players ={ filteredPlayers  ? filteredPlayers  : console.log("No player Available")} />
                </TableBody>
                
                </Box>
              </Table>
            </TableContainer>
          </div>
        </div>
    </Container>


   
    </div>
  );
};

export default PlayerSection;