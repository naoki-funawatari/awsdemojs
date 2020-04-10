import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import SettingsIcon from '@material-ui/icons/Settings';

export const mainListItems = (
  <div>
    <ListSubheader inset>Main</ListSubheader>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/schedules">
      <ListItemIcon>
        <EventNoteIcon />
      </ListItemIcon>
      <ListItemText primary="Schedules" />
    </ListItem>
    <ListItem button component={Link} to="/personal">
      <ListItemIcon>
        <PermContactCalendarIcon />
      </ListItemIcon>
      <ListItemText primary="Personal" />
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset >Maintenance</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Resources" />
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);