import React from 'react';
import {Link} from 'react-router-dom';

export default class UserSignIn extends React.Component {
  constructor(){
    super();
    this.state = {
      emailAddress: '',
      password: '',
      errors: []
    }
  }

  render(){
    return(
      <div className="form--centered">
        <h2>Sign In</h2>
        {
          this.state.errors.length > 0 ?
          <ErrorsDisplay errors={this.state.errors} />
          :
          null
          
        }
        <form onSubmit={this.submit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input onChange={this.change} type="text" id="emailAddress" name="emailAddress" />
          <label htmlFor="password">Password</label>
          <input onChange={this.change} type="password" id="password" name="password" />
          <button className="button" type="submit">Sign In</button>
          <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to="/signup">sign up!</Link></p>
      </div>
    );
  }

  change = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState(() => {
      return {
        [name]: value
      }
    })
  }

  submit = (e) => {
    e.preventDefault();
    const { context } = this.props;
    const { emailAddress, password } = this.state;
    const { from } = this.props.location.state || {from: {pathname: '/courses' } };

    context.actions.signIn(emailAddress, password)
      .then(user => {
        if(user === null) {
          this.setState(() => {
            return {
              errors: ["Sign in was unsucessful"]
            }
          })
        } else {
          this.props.history.push(from)
        }
      })
      .catch(err => {
        console.error(err);
        this.props.history.push('/error')
      })

  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }
}

function ErrorsDisplay({ errors }) {
  let errorDisplay = null;

  if(errors.length) {
    errorDisplay = (
      <div className="validation--errors">
        <h3>Error</h3>
        <ul>
          {errors.map((error, i) => <li key={i}>{error}</li>) }
        </ul>
      </div>
    )
  }
  
  return errorDisplay;
}