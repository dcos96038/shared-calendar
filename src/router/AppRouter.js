import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Switch, Redirect} from "react-router-dom";

import {startChecking} from "../actions/auth";
import {LoginScreen} from "../components/auth/LoginScreen";
import {CalendarScreen} from "../components/calendar/CalendarScreen";

import {PrivateRoute} from "./PrivateRoute";
import {PublicRoute} from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const {checking, uid} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Loading...</h5>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute exact component={LoginScreen} isAuthenticated={!!uid} path="/login" />
          <PrivateRoute exact component={CalendarScreen} isAuthenticated={!!uid} path="/" />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
