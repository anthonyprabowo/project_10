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
      currentPassword: '',
    }
  }

  render() {
    const {authenticatedUser} = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        updateCourse: this.updateCourse,
        getCourses: this.getCourses,
        getCourse: this.getCourse,
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

  getCourse = async (id) => {
    const getCourse = await this.data.getCourse(id);
    return getCourse["course"][0]
  }

  updateCourse = async (id, body) => {
    const {authenticatedUser} = this.state
    const updateCourse = await this.data.updateCourse(id, body, authenticatedUser.user.emailAddress, authenticatedUser.password)
    return updateCourse
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if(user !== null) {
      user.password = password
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
