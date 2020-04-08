import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateUserAsync } from '../features/authentication/users';
import { updateEventsAsync } from '../features/events/events';
import { updateResourcesAsync } from '../features/events/resources';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from './Navigation';
import Main from './Main';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

export default () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(updateUserAsync());
    dispatch(updateEventsAsync());
    dispatch(updateResourcesAsync());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Navigation />
      <Main />
    </div>
  );
}
