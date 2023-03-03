import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Home from "./main/pages/Home";
import Survey from "./main/pages/Survey";
import PostView from "./post/page/PostView";
import NewPost from "./post/page/NewPost";
import UpdatePost from "./post/page/UpdatePost";
import Auth from "./main/pages/Auth";
import ReqSurvey from "./main/pages/ReqSurvey";
import Register from "./survey/pages/Register";
import SurveyForm from "./survey/pages/SurveyForm";
import { AuthContext } from "./shared/context/auth-context";

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 *60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token) {
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
        <Route path="/:postId/update" exact>
          <UpdatePost />
        </Route>
        <Route path="/:postId/register" exact>
          <Register />
        </Route>
        <Route path="/:postId/survey" exact>
          <SurveyForm />
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
        <Route path="/:postId/survey" exact>
          <SurveyForm />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
