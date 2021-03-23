import React from 'react';
import withContext from './Context';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// component
import Header from './component/Header'
import Courses from './component/Courses';
import UserSignUp from './component/UserSignUp';
import UserSignIn from './component/UserSignIn';
import UserSignOut from './component/UserSignOut'

const HeaderWithContext = withContext(Header);
const coursesWithContext = withContext(Courses);
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
          <Route path="/signup" component={userSignUpWithContext} />
          <Route path="/signin" component={userSignInWithContext} />
          <Route path="/signout" component={userSignOutWithContext} />
        </Switch>    
        
      </div>
    </Router>
      
      
  );
}

export default App;
