import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Input from './Input';
import List from './List';
import Tabs from './Tabs';

export default () => {
  return (
    <Router>
      <Link to="/input">input</Link>
      <span>　</span>
      <Link to="/list">list</Link>
      <Switch>
        <Route path="/input" component={Input} />
        <Route path="/list" component={List} />
      </Switch>
      <Tabs />
    </Router>
  );
}
