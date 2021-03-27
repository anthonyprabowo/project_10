import React from 'react';
import withContext from './Context';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// component
import Header from './component/Header'
import Courses from './component/Courses';
import CourseDetail from './component/CourseDetail';
import UpdateCourse from './component/UpdateCourse';
import CreateCourse from './component/CreateCourse';
import UserSignUp from './component/UserSignUp';
import UserSignIn from './component/UserSignIn';
import UserSignOut from './component/UserSignOut';
import PrivateRoute from './PrivateRoute';
import Error from './component/Error';
import NotFound from './component/NotFound';
import Forbidden from './component/Forbidden';

const HeaderWithContext = withContext(Header);
const coursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);
const userSignUpWithContext = withContext(UserSignUp)
const userSignInWithContext = withContext(UserSignIn)
const userSignOutWithContext = withContext(UserSignOut);

function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          <Route exact path="/">{<Redirect to="/courses" />}</Route>
          <Route exact path="/courses" component={coursesWithContext} />
          <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route exact path="/courses/:id" component={CourseDetailWithContext} />
          <Route exact path="/signup" component={userSignUpWithContext} />
          <Route exact path="/signin" component={userSignInWithContext} />
          <Route exact path="/signout" component={userSignOutWithContext} />
          <Route exact path="/error" component={Error} />
          <Route exact path="/forbidden" component={Forbidden} />
          <Route component={NotFound} />
        </Switch>    
        
      </div>
    </Router>
      
      
  );
}

export default App;
