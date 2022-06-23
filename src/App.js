import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main className="mt-20">
        <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:uid/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:pid" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
