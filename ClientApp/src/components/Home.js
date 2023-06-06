import React, {Component, useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import Interactive from "./Interactive";
import Box from "@mui/material/Box";


const Home = ({experiment, id, displayId}) => {

    
    return (
          <Stack direction="column" alignItems="center"  spacing={2} style={{padding:"2em"}}>
          Participant: # {displayId}

            <img src="band_logo.png" style={{ width:"30%", maxWidth:"200px"}}/> 
              
            <h2>music all night long</h2> 
               <Box sx={{height:"100%"}}><Interactive experiment={experiment} id={id}/></Box>
              
              <p>Follow <a href="https://www.instagram.com/">@dj</a> on Instagram</p>

          </Stack>
      );
}
export default Home;
