import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import { deleteToken } from './stores/token';
// import Header from './components/Header';
import Main from './components/Main';
// import './scss/style.scss';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const token = useSelector(state => state.token);
  const root = document.getElementById('root');
  root.className = isAuthenticated(token)
    ? 'authenticated'
    : 'unauthenticated';

  if ((pathname !== '/signin' && pathname !== '/signup') && !isAuthenticated(token)) {
    dispatch(deleteToken());
    history.push({ pathname: '/signin' });
  }

  return (
    <>
      <Main />
    </>
  );
}

const isAuthenticated = token => token !== null;
// const isAuthenticated = async token => {
//   const res = await fetch('https://localhost:44335/Authenticated', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//   });

//   console.log(res.status);
//   return res.status === 200;
// }
