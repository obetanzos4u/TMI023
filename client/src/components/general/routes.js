import React from "react";
import Main from "../pages/list";
import Task from "../pages/manageTask";
import Login from "../pages/login";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AdminList from "../pages/AdminList";

function Routes(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/main">
            <Main />
          </Route>
          <Route exact path="/task">
            <Task />
          </Route>
          <Route exact path="/admin">
            <AdminList />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Routes;
