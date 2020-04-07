import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Switch, Route } from 'react-router-dom';
import { updateEventsAsync } from '../features/events/events';
import { updateResourcesAsync } from '../features/events/resources';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Dashboard from '../features/dashboard/Dashboard';
import Resource from '../features/events/Resource';
import Calendar from '../features/events/Calendar';
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
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(updateEventsAsync());
    dispatch(updateResourcesAsync());
  }, [dispatch]);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route path="/resource" component={Resource} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/" component={Dashboard} />
        </Switch>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}
