import React, { Component } from 'react';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from "@mui/material/BottomNavigation";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import Paper from "@mui/material/Paper";
import { Link } from 'react-router-dom';
export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            showLabels
            value={"value"}
            onChange={(event, newValue) => {
                //setValue(newValue);
            }}
        >
            <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction  component={Link}  to="/Request" label="Request a song" icon={<MusicNoteIcon />} />
            <BottomNavigationAction  component={Link} to="/Chat" label="Talk to the DJ" icon={<ChatIcon />} />
        </BottomNavigation>
        </Paper>
    );
  }
}
