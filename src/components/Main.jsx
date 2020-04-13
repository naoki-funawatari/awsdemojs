import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Dashboard from '../features/dashboard/Dashboard';
import Schedules from '../features/events/Schedule';
import Resources from '../features/maintenance/Resources';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route path="/schedules" component={Schedules} />
          <Route path="/personal" component={Schedules} />
          <Route path="/resources" component={Resources} />
          <Route path="/" component={Dashboard} />
        </Switch>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}
