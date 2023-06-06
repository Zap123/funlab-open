import React, {Component, useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const renderCommand = (experiment, experimentDone, setExperimentDone, id) => {
    
    return (parseCommand(experiment,experimentDone, setExperimentDone, id))??<><img src="disco-ball.gif" />
    <h1>Wait for the magic to happen...</h1></>
}

const submitExperiment = async (result, experimentName, setExperimentDone, command, id) => {
            const response = await fetch('interactive/experiments', {
                method: "POST",
                body: JSON.stringify({ "participantId": id,"name":experimentName,"result": result,"command": JSON.stringify(command)}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    setExperimentDone({name: experimentName, participated: true})
    console.log(result)
}

const parseCommand = (commandStr, experimentDone, setExperimentDone, id) => {

    console.log(commandStr)
    if(commandStr === null ) return;
    try {
        let command = JSON.parse(commandStr)

        switch (command.action) {
            // TODO: "send to a particular user", TODO:"LIST OF USERS"
            case "text":
                console.log(command.action)
                return <h1 className="shaky">{command.parameters[0]}</h1>
            case "stop":
                return null
            case "color":
                return <div style={{height:"300px", width:"300px", backgroundColor:command.parameters[0]}} />
            case "experiment":
                return experimentDone?.name === command.parameters[0]?null:<FormControl>
                    <FormLabel id="demo-radio-buttons-group-label" style={{color:"white"}}>{command.parameters[0]}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={(e) => submitExperiment(e.target.value, command.parameters[0], setExperimentDone, command, id)}>
                        {command.parameters.slice(1).map(x=> {
                            return <FormControlLabel value={x} control={<Radio />} label={x} />
                        })}
                    </RadioGroup>
                </FormControl>
        }
    } catch (e){console.log("error parsing", commandStr, e)}

}


const Interactive = ({experiment, id}) => {
    console.log(id)
    const [ experimentDone, setExperimentDone ] = useState({});
    console.log(experiment)
    return (
            <div id="monitorscreen" style={{width:"100%", height:"auto"}} >
                <Stack alignItems="center"  style={{padding:"2em"}}>
                    {renderCommand(experiment, experimentDone, setExperimentDone, id)}
                </Stack>
            </div>
        );
    
}

export default Interactive;