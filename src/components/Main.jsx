import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Link, Switch, Route } from 'react-router-dom';
import { updateEventsAsync } from '../stores/events';
import { updateResourcesAsync } from '../stores/resources';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Dashboard from '../dashboard/Dashboard';
import Resource from './Resource';
import Calendar from './Calendar';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
          <Route exact path="/" component={Dashboard} />
          <Route path="/resource" component={Resource} />
          <Route path="/calendar" component={Calendar} />
        </Switch>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}
