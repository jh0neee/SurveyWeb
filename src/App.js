import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Home from "./survey/pages/Home";
import Survey from "./survey/pages/Survey";
import PostView from "./post/page/PostView";
import NewPost from "./post/page/NewPost";
import UpdatePost from "./post/page/UpdatePost";
import Auth from "./survey/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import ReqSurvey from "./survey/pages/ReqSurvey";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/survey" exact>
          <Survey />
        </Route>
        <Route path="/survey/request" exact>
          <ReqSurvey />
        </Route>
        <Route path="/:postId/content" exact>
          <PostView />
        </Route>
        <Route path="/post/new" exact>
          <NewPost />
        </Route>
        <Route path="/post/:contentId">
          <UpdatePost />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/survey" exact>
          <Survey />
        </Route>
        <Route path="/:postId/content" exact>
          <PostView />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
    >
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
