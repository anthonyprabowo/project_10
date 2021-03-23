import React from 'react';
import {Link} from 'react-router-dom';

const Headers = (props) => {
  const { context } = props;
  const authenticatedUser = context.authenticatedUser;
  return(
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to='/'>Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedout">
            {
              authenticatedUser ? 
              <React.Fragment>
                <li>{`Hello, ${authenticatedUser["user"].firstName}`}</li>
                <li>
                  <Link to='/signout'>Sign Out</Link>
                </li>
              </React.Fragment>
              :
              <React.Fragment>
                <li>
                  <Link to='/signup'>Sign Up</Link>
                </li>
                <li>
                  <Link to='/signin'>Sign In</Link>
                </li>
              </React.Fragment>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Headers