import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const UserSignOut = (props) => {
  const { context } = props
  // we need to use useEffect or else there will be an error in the console.
  useEffect(() => context.actions.signOut()); 
  return(
    <Redirect to="/courses" />
  )
  
}

export default UserSignOut;