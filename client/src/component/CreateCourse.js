import React from 'react';

export default class CreateCourse extends React.Component {
  constructor(){
    super()
    this.state = {
      courseTitle: '',
      courseDescription: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: [],
      user: {},
      userName: ''
    }
  }

  getUser = () => {
    const {context} = this.props;
    const user = context.authenticatedUser;
    
    this.setState(() => {
      return {
        user,
        userName: `${user.user.firstName} ${user.user.lastName}`
      }
    })
  }

  componentDidMount(){
    this.getUser();
  }

  render() {
    const {userName} = this.state
    return(
      <main>
        <div className="wrap">
          <h2>Create Course</h2>
          {/* insert validation error here */}
          {
            this.state.errors.length > 0 ? 
            <div className="validation--errors">
              <h3>Validation Error</h3>
              <ul>
                {this.state.errors.map((err, i) => <li key={i}>{err}</li>)}
              </ul>
            </div>
            :
            null
          }
          <form onSubmit={this.submit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input onChange={this.change} type='text' id="courseTitle" name="courseTitle" />
                <label htmlFor="courseAuthor">Course Author</label>
                <input disabled="disabled" type='text' id="courseAuthor" name="courseAuthor" value={userName}/> 
                <label htmlFor="courseDescription">Course Description</label>
                <textarea onChange={this.change} type='text' id="courseDescription" name="courseDescription" />               
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input onChange={this.change} type='text' id="estimatedTime" name="estimatedTime" />
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea onChange={this.change} type='text' id="materialsNeeded" name="materialsNeeded" />
              </div>
            </div>
            <button className="button" type="submit">Create Course</button>
            <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
          </form>
        </div>
      </main>
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
    const { courseTitle, courseDescription, estimatedTime, materialsNeeded, user } = this.state;
    const course = {
      title: courseTitle,
      description: courseDescription,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded,
      userId: user.user.id
    };
    

    context.data.createCourse(course, user.user.emailAddress, user.password)
      .then(arr => {
        if(arr.length > 0) {
          this.setState({errors: arr})
        } else {
          this.props.history.push('/courses')
        }
      })
      .catch(err => {
        console.error(err)
        this.props.history.push('/error')
      });
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }
}