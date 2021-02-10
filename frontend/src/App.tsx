import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Users from './user/pages/Users';
import Auth from './user/pages/Auth';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/authContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const login = React.useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = React.useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route exact path="/" >
          <Users />
        </Route>
        <Route exact path="/:userId/places" >
          <UserPlaces />
        </Route>
        <Route exact path="/auth" >
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" >
          <Users />
        </Route>
        <Route exact path="/:userId/places" >
          <UserPlaces />
        </Route>
        <Route path="/places/:placeId" >
          <UpdatePlace />
        </Route>
        <Route exact path="/auth" >
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      login,
      logout 
    }}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
