import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm/index';
import NavBar from './components/NavBar';
import Home from './components/Home'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList/UsersList';
import User from './components/User';
import Footer from "./components/Footer"
import ClubsPage from './components/ClubsPage'
import IndividualClub from './components/IndividualClub';
import NotFound from './components/NotFound'
import { authenticate } from './store/session';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/signup' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/clubs/' exact={true} >
            <ClubsPage />
          </ProtectedRoute>
          <ProtectedRoute path='/clubs/:id' exact={true}>
            <IndividualClub />
          </ProtectedRoute>
          <Home path='/' exact={true} />
          <Route path='*'><NotFound /></Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
