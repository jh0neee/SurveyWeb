import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Home from "./main/pages/Home";
import Survey from "./main/pages/Survey";
import PostView from "./post/page/PostView";
import NewPost from "./post/page/NewPost";
import UpdatePost from "./post/page/UpdatePost";
import Auth from "./main/pages/Auth";
import Register from "./survey/pages/Register";
import SurveyForm from "./survey/pages/SurveyForm";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey/*" element={<Survey />} />
        <Route path="/:postId/content" element={<PostView />} />
        <Route path="/post/new" element={<NewPost />} />
        <Route path="/:postId/update" element={<UpdatePost />} />
        <Route path="/:postId/register" element={<Register />} />
        <Route path="/:postId/survey" element={<SurveyForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey/*" element={<Survey />} />
        <Route path="/:postId/content" element={<PostView />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/:postId/survey" element={<SurveyForm />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
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
