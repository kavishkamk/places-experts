import React, { useState, useCallback, useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {

  const auth = useContext(AuthContext);

  const [isLoggedin, setIsLoggedIn] = useState(false);

  const logIn = useCallback(() => {
    setIsLoggedIn(true);
  } ,[]);

  const logOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routs;

  if(isLoggedin) {
    routs = (
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
    );
  } else {
    routs = (
      <Switch>
          <Route path="/" exact>
              <Users />
          </Route>
          <Route path="/:uid/places" exact>
              <UserPlaces />
          </Route>
          <Route path="/auth" exact>
              <Auth />
          </Route>
          <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedin, 
        login: logIn, 
        logout: logOut
      }}
    >
      <Router>
        <MainNavigation />
        <main className="mt-20">
          {routs}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
