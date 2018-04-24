import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CityRoute from './CityRoute';
import TourRoute from './TourRoute';
const App = () => (
  <Switch>
    <Route exact path='/' render={() => <Redirect to='/city/Phuket' />} />
    <Route path='/city' component={CityRoute} />
    <Route path='/activity' component={TourRoute} />
  </Switch>
);

export default App;