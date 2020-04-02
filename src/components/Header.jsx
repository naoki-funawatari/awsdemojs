import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateUserAsync } from '../stores/user';
import TransitionButton from './TransitionButton';

export default () => {
  const { pathname } = useLocation();
  const token = useSelector(state => state.token);
  const { id, name } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUserAsync(token));
  }, [dispatch, token]);

  return (
    <header>
      <div>{token ? `${id}  -  ${name}` : ''}</div>
      <div>
        <TransitionButton pathname={pathname} />
      </div>
    </header>
  );
}
