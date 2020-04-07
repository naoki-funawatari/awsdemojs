import React from 'react';
import { useSelector } from "react-redux";
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Top from './components/Top';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default () => {
  const token = useSelector(state => state.token);
  const root = document.getElementById('root');
  root.className = isAuthenticated(token)
    ? 'authenticated'
    : 'unauthenticated';

  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" render={() =>
          isAuthenticated(token)
            ? <Top />
            : <SignIn />} />
      </Switch>
    </Router>
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
