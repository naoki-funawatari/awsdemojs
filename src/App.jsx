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
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <CustomRoute path="/">
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
      path={path}
      render={({ location }) => {
        if (isAuthenticated(token)) {
          // 認証済みの場合は、トップページを表示する
          return children;
        }
        if (location.pathname === "/") {
          // URL が "/" の場合はサインインページを表示する
          return <SignIn />;
        }
        // 未認証で、URL が "/" 以外の場合は "/" にリダイレクトする
        // URL が "/" となるので、結果的にサインインページが表示される
        return <Redirect to={{ pathname: "/" }} />;
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
