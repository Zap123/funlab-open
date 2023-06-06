import React, {Component, useEffect, useState} from 'react';
import  Layout  from './components/Layout';
import  Home  from './components/Home';
import Chat  from './components/Chat';
import  Music  from './components/Music';
import  Admin  from './components/Admin';

import './custom.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {HubConnectionBuilder} from "@microsoft/signalr";

const App = () => {
    const [ connection, setConnection ] = useState(null);
    const [ experiment, setExperiment ] = useState(null);
    const [ invalidation, setInvalidation ] = useState(null);
    const [ displayId, setDisplayId ] = useState("");
    const [ id, setId ] = useState("");

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('/interactive')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);


    useEffect(() => {
        async function getID() {
            // getting stored value
            const saved = localStorage.getItem("displayID");
            const saved2 = localStorage.getItem("ID");
            console.log(saved2)
            if (saved !== null) {
                setDisplayId(saved);
                setId(saved2);
                
            }
        else {
                const response = await fetch('interactive/participants', {method: "POST"});
                const data = await response.json();
                if (data != null) {
                    localStorage.setItem("displayID", data.displayIdentifier);
                    localStorage.setItem("ID", data.id);
                    setDisplayId(data.displayIdentifier);
                    setId(data.id);
                }
            }
        }

        getID();
    }, []);
    
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('Command', message => {
                        setExperiment(message)
                        console.log("received: ", message)
                    });

                    connection.on('Invalidate', resource => {
                        setInvalidation(resource+Date()) // should probably fix this
                        console.log("invalidation received: ", resource)
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    return (
              <Switch>
                  <Route path="/Admin">
                      <Admin connection={connection} invalidation={invalidation} />
                  </Route>
                  <Route path="/Chat">
                      <Layout>
                      <Chat  id={id} />
                      </Layout>
                  </Route>
                  <Route path="/Request">
                      <Layout>
                      <Music  id={id} />
                      </Layout>
                  </Route>
                  <Route  path="/">
                      <Layout>
                      <Home experiment={experiment} displayId={displayId} id={id} />
                      </Layout>
                  </Route>
            </Switch>

    );
}

export default App;