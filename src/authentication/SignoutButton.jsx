import React from 'react';
import { useDispatch } from "react-redux";
import { deleteToken } from './token';
import { Button } from '@material-ui/core';

export default () => {
  const dispatch = useDispatch();
  const signOut = () => dispatch(deleteToken());
  return (
    <Button
      variant="outlined"
      style={{ backgroundColor: 'white' }}
      onClick={signOut}>
      SIGN OUT
    </Button>
  );
}
