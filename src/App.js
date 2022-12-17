import React from "react";
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

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/survey" exact>
            <Survey />
          </Route>
          <Route path="/:userId/content" exact>
            <PostView />
          </Route>
          <Route path="/post/new" exact>
            <NewPost />
          </Route>
          <Route path="/posts/:contentId">
            <UpdatePost />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
