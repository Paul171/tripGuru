import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Tour from './Tour';

const TourRoute = () => (
  <Switch>
    <Route exact path='/activity' />
    <Route path='/activity/:id' component={Tour} />
  </Switch>
)

export default TourRoute;