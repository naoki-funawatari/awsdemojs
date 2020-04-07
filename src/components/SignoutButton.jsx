import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deleteToken } from '../stores/token';
import { Button } from '@material-ui/core';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const signOut = () => {
    dispatch(deleteToken());
    history.push({ pathname: "/" });
  }
  return (
    <Button variant="outlined" style={{ backgroundColor: 'white' }} onClick={signOut}>SIGN OUT</Button>
  );
}
