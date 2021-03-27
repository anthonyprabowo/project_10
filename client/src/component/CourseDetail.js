import React from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      user: {},
      currentUser: {}
    }
  }

  getCourse = async () => {
    const { context } = this.props
    const { id } = this.props.match.params
    const data = await context.actions.getCourse(id);
    if(data) {
      const user = await data.associatedUser
      this.setState(() => {
        return {
          data,
          user,
          paragraphs: data.description,
          materials: data.materialsNeeded !== null ? data.materialsNeeded : null,
          currentUser: context.authenticatedUser,
          errors: {},
        }
      })
    } else {
      this.props.history.push('/notfound');
    }
  }

  componentDidMount() {
    this.getCourse();
  }

  render(){
    const { data, user } = this.state;
    const { context } = this.props;
    const currentUser = context.authenticatedUser;
    return(
      <main>
        <div className="actions--bar">
            {
              currentUser !== null && currentUser.user.emailAddress === user.emailAddress ? 
              <div className="wrap">
                <Link className="button" to={`/courses/${data.id}/update`}>Update Course</Link>
                <button className="button" onClick={this.delete}>Delete Course</button>
                <Link className="button button-secondary" to='/courses'>Return to List</Link>
              </div> :
              <div className="wrap">
                <Link className="button button-secondary" to='/courses'>Return to List</Link>
              </div>
            }
        </div>
        <div className ="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{data.title}</h4>
                <p>{`By ${user.firstName} ${user.lastName}`}</p>
                <ReactMarkdown source={data.description} />
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{data.estimatedTime !== null ? data.estimatedTime : null}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown source={data.materialsNeeded} />
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
      
    )
  }

  delete = () => {
    const {currentUser} = this.state;
    const {id} = this.props.match.params;
    const {context} = this.props;
    console.log(currentUser.user.emailAddress);
    context.data.deleteCourse(id, currentUser.user.emailAddress, currentUser.password)
      .then(arr => {
        if(arr !== null) {
          this.props.history.push('/forbidden');
        } else {
          this.props.history.push('/')
        }
      })
      .catch(err => {
        console.error(err)
        this.props.history.push('/error')
      })
  }
}

