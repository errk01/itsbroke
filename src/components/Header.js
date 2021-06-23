import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {auth} from '../service/firebase'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      {auth().currentUser 
        ? 
        <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab to="/home" label="profile" />
        <Tab onClick={()=> auth().signOut()} label="Logout" />
        
      </Tabs>
        
        :<Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Item One" />
        <Tab label="Sign in" />
        <Tab label="Sign up" />
        
      </Tabs>
    }
    </Paper>
  );
}