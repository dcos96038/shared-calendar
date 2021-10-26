import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import {LoginScreen} from "../components/auth/LoginScreen";
import {CalendarScreen} from "../components/calendar/CalendarScreen";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact component={LoginScreen} path="/login" />
          <Route exact component={CalendarScreen} path="/" />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
