import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Top from './Top';

export default () => {
  return (
    <main>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/" component={Top} />
        <Route path="/resource" component={Top} />
      </Switch>
    </main>
  );
}
