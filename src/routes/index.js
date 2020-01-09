import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router, } from 'react-router-dom';
import { ErrorScreen } from '../elements/notifications';
import SinglePageApp from '../elements/SinglePageApp';
import { NOT_FOUND_404 } from '../constants';

const Routes = ({ config }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <SinglePageApp config={config} />} />
        {/* <Route path={ "/url" + ":uid/:token"} render={() => (<></>)} /> */}
        <Route path={NOT_FOUND_404} component={() => (<ErrorScreen error={{ code: 404, errorMsg: 'Page not found.' }} />)} />
        <Redirect to={NOT_FOUND_404} />
      </Switch>
    </Router>
  );
}

export default Routes;