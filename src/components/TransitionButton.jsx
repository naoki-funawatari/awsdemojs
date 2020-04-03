import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deleteToken } from '../stores/token';
import { Button } from '@material-ui/core';

export default ({ pathname }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const signUp = () => {
    dispatch(deleteToken());
    history.push({ pathname: '/signup' });
  }
  const signIn = () => {
    dispatch(deleteToken());
    history.push({ pathname: '/signin' });
  }
  const signOut = () => {
    dispatch(deleteToken());
    history.push({ pathname: '/signin' });
  }
  if (pathname === '/signin') {
    return (<Button variant="outlined" style={{ backgroundColor: 'white' }} onClick={signUp}>SIGN UP</Button>);
  }
  if (pathname === '/signup') {
    return (<Button variant="outlined" style={{ backgroundColor: 'white' }} onClick={signIn}>SIGN IN</Button>);
  }
  return (<Button variant="outlined" style={{ backgroundColor: 'white' }} onClick={signOut}>SIGN OUT</Button>);
}
