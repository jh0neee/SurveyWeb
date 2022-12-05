import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Survey from "./survey/pages/Survey";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Survey />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
