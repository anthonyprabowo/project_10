import React from 'react'
import {Link} from 'react-router-dom';

export default class UserSignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: [],
    }
  }
  render() {
    return(
      <div className="form--centered">
        <h2>Sign Up</h2>
        {
          this.state.errors.length ? 
          <ErrorsDisplay errors={this.state.errors} />
          :
          null
        }
        <form onSubmit={this.submit}>
          <label htmlFor="firstName">First Name</label>
          <input onChange={this.change} type="text" id="firstName" name="firstName" />
          <label htmlFor="lastName">Last Name</label>
          <input onChange={this.change} type="text" id="lastName" name="lastName" />
          <label htmlFor="email">Email Address</label>
          <input onChange={this.change} type="text" id="email" name="email" />
          <label htmlFor="password">Password</label>
          <input onChange={this.change} type="password" id="password" name="password" />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input onChange={this.change} type="password" id="confirmPassword" name="confirmPassword" />
          <button className="button" type="submit">Sign Up</button>
          <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <Link to="/signin">sign in!</Link></p>
      </div>
    )
  }
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return({
        [name]: value
      })
    })
  }

  submit = (e) => {
    e.preventDefault();
    const { context } = this.props;
    const {firstName, lastName, email, password, confirmPassword} = this.state;
    if(password.normalize() === confirmPassword.normalize()) {
      const user = {
        firstName,
        lastName,
        emailAddress: email,
        password
      }
      console.log(user);
      context.data.createUser(user)
        .then(errors => {
          if(errors.length) {
            console.log(errors);
            this.setState({errors})
          } else {
            context.actions.signIn(email, password);
            this.props.history.push('/');
          }
        })
        .catch(err => {
          console.error(err);
          this.props.history.push('/error');
        });
    } else {
      alert('Password and Confirmed Password does not match');
    }
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
        <h3>Validation Error</h3>
        <ul>
          {errors.map((error, i) => <li key={i}>{error}</li>) }
        </ul>
      </div>
    )
  }
  
  return errorDisplay;
}