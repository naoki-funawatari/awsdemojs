import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deleteToken } from '../stores/token';

export default ({ pathname }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const signUp = () => {
    dispatch(deleteToken());
    history.push({ pathname: '/signup' });
  }
  const signIn = () => {
    dispatch(deleteToken());
    history.push({ pathname: '/' });
  }
  const signOut = () => {
    dispatch(deleteToken());
    history.push({ pathname: '/' });
  }
  if (pathname === '/') {
    return (<button type="button" onClick={signUp}>SIGN UP</button>);
  }
  if (pathname === '/signup') {
    return (<button type="button" onClick={signIn}>SIGN IN</button>);
  }
  return (<button type="button" onClick={signOut}>SIGN OUT</button>);
}
