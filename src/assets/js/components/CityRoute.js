import React from 'react';
import { Switch, Route } from 'react-router-dom';
import City from './City';
const CityRoute = () => (
  <Switch>
    <Route exact path='/city' />
    <Route path='/city/:name' component={City} />
  </Switch>
);

export default CityRoute;
