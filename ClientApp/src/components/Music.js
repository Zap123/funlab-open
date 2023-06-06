import React, {Component, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import {Stack} from "@mui/material";

const Music = ({id}) => {
    const [ song, setSong ] = useState("");

    return (
      <Stack alignItems="center" spacing={2} style={{padding:"2em"}}>
         <h1>Request a song</h1>

       <p>Enter the title of a song you would like to hear.</p>
          <Paper elevation={2} >
            <TextField multiline value={song} rows={2} style={{width:"100%"}} label="Name - Author" 
                       variant="standard" onChange={(e)=>setSong(e.target.value) }/>
          </Paper>

      <button className="btn btn-primary" onClick={async () => {
          if(song !== "") {
              const response = await fetch('interactive/songs', {
                  method: "POST",
                  body: JSON.stringify({"song": song, "participantId": id}),
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
              setSong("")
          }
      }
      }>Send</button>
      </Stack>
    );
}

export default Music;
