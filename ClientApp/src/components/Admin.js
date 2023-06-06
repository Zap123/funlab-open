import React, {useEffect, useState} from 'react';
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";



const Admin = ({connection, invalidation}) => {
    const [ messages, setMessages ] = useState([]);
    const [ songs, setSongs ] = useState([]);
    const [ experiments, setExperiments ] = useState([]);
    const [ command, setCommand ] = useState("");

    useEffect(() => {
        async function fnmsg() {
            console.log("Refresh data")
            const response = await fetch('interactive/data')
            const data = await response.json();

            setMessages(data.messages)
            setSongs(data.songs)
            setExperiments(data.experiments)
        }
        fnmsg();
        

    }, [invalidation]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <h1>admin</h1>
            </Grid>

            <Grid item xs={12}>
                <h2> Command window </h2>
                <Paper elevation={2}>
                    <TextField  multiline value={command} rows={4} style={{width:"100%"}} placeholder="{'action': '', 'parameters': [] }"
                                variant="standard" onChange={(e)=>setCommand(e.target.value)} />
                </Paper>

                <button className="btn btn-primary" onClick={async () => {
                    await connection.invoke("Command", command);
                    setCommand("")
                }
                }>Send</button>
            </Grid>
            
            <Grid item xs={6}>
                <h2> Messages </h2>
        <TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Text </TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {messages.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell align="center">{row.text}</TableCell>
                            <TableCell align="right">{row.timestamp}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            </Grid>
            <Grid item xs={6}>
            <h2> Song requests </h2>
        <TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Song</TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songs.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{row.song}</TableCell>
                            <TableCell align="right">{row.timestamp}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <h2> Experiments </h2>
                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Result</TableCell>
                                <TableCell align="right">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {experiments.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.result}</TableCell>
                                    <TableCell align="right">{row.timestamp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>)
  
}

export default Admin;
