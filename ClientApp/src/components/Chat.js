import React, {Component, useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const Chat = ({id}) => {
    const [ text, setText ] = useState("");
    return (
        <Stack alignItems="center" spacing={2}  style={{padding:"2em"}}>

        <h1>Talk to the Dj</h1>

        <p>Send us a message to let us know how its going or to tell us something</p>

            <Paper elevation={2}>
                <TextField multiline value={text} rows={4} style={{width:"100%"}} placeholder="Tell us something"
                           variant="standard" onChange={(e)=>setText(e.target.value) }/>
            </Paper>

            <button className="btn btn-primary" onClick={async () => {
                if(text !== "") {
                    const response = await fetch('interactive/messages', {
                        method: "POST",
                        body: JSON.stringify({"message": text, "participantId": id}),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    setText("")
                }
            }
            }>Send</button>      
        </Stack>
    );
  
}

export default Chat;
