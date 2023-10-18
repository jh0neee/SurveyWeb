import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoadingSpinner from "./shared/components/UIElement/LoadingSpinner";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Home = React.lazy(() => import("./main/pages/Home"));
const Survey = React.lazy(() => import("./main/pages/Survey"));
const MobileResult = React.lazy(() => import("./main/components/MobileResult"));
const PostView = React.lazy(() => import("./post/page/PostView"));
const NewPost = React.lazy(() => import("./post/page/NewPost"));
const UpdatePost = React.lazy(() => import("./post/page/UpdatePost"));
const Auth = React.lazy(() => import("./main/pages/Auth"));
const Register = React.lazy(() => import("./survey/pages/Register"));
const SurveyForm = React.lazy(() => import("./survey/pages/SurveyForm"));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/survey/*' element={<Survey />} />
        <Route path='/:postId/content' element={<PostView />} />
        <Route path='/post/new' element={<NewPost />} />
        <Route path='/:postId/update' element={<UpdatePost />} />
        <Route path='/:postId/register' element={<Register />} />
        <Route path='/:postId/survey' element={<SurveyForm />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/survey/*' element={<Survey />} />
        <Route path='/:postId/content' element={<PostView />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/:postId/survey' element={<SurveyForm />} />
        <Route path='/:postId/result' element={<MobileResult />} />
        <Route path='*' element={<Navigate to='/auth' />} />
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
      }}>
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }>
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
