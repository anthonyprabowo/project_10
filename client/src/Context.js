import React, {Component} from 'react';
import Data from './Data';
import cookies from 'js-cookie';


const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticatedUser: cookies.getJSON('user') || null,
    }
  }

  render() {
    const {authenticatedUser} = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        getCourses: this.getCourses,
        signIn: this.signIn,
        signOut: this.signOut,
      }
    }
    return(
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }

  getCourses = async () => {
    const allCourses = await this.data.getAllCourse();
    return allCourses["course"]
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if(user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user
        }
      })
      cookies.set('user', JSON.stringify(user), {expires: 1});
    }
    return user
  }

  signOut = () => {
    this.setState({authenticatedUser: null});
    cookies.remove('user');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
export default function withContext(Component){
  return function contextComponent(props) {
    return(
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    )
  }
}
