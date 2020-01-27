import React from 'react';
import { Switch, Route } from 'react-router-dom'
import App2 from './App2'

export default (
  <Switch>
    <Route component={App2} exact path="/" />
    <Route render={ () => {
      return <h1>404 Page Not Found.</h1>
    }} />
  </Switch>
)