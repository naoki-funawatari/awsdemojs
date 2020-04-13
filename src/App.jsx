import React from 'react';
import { useSelector } from "react-redux";
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Contents from './components/Contents';
import SignIn from './features/authentication/SignIn';
import SignUp from './features/authentication/SignUp';

export default () => {
  return (
    <Router>
      <Switch>
        <CustomRoute>
          {/* ↓↓↓ ここに書かれているものが children に渡される ↓↓↓ */}
          <Contents />
          {/* ↑↑↑ ここに書かれているものが children に渡される ↑↑↑ */}
        </CustomRoute>
      </Switch>
    </Router>
  );
}

const CustomRoute = ({ children, path }) => {
  const token = useSelector(state => state.token);

  return (
    <Route
      render={({ location }) => {
        if (location.pathname === "/signin") {
          return <SignIn />;
        }
        if (location.pathname === "/signup") {
          return <SignUp />
        }
        if (isAuthenticated(token)) {
          return children;
        } else {
          return <Redirect to={{ pathname: "/signin" }} />;
        }
      }}
    />
  );
}

// 認証判定用のダミー関数
const isAuthenticated = token => token !== null;
// const isAuthenticated = async token => {
//   const res = await fetch('https://naoki-funawatari.tk/api/Authenticated', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//   });

//   console.log(res.status);
//   return res.status === 200;
// }
