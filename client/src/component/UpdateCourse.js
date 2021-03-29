import React from 'react';

export default class UpdateCourse extends React.Component {
  constructor(){
    super();
    this.state = {
      courseTitle: '',
      courseAuthor: '',
      courseDescription: '',
      estimatedTime: '',
      materialsNeeded: '',
      user: {},
      errors: []
    };
  }

  getCourse = async () => {
    const { context } = this.props
    const { id } = this.props.match.params
    const data = await context.actions.getCourse(id);
    if(data === undefined) {
      this.props.history.push('/notfound')
    } else {
      const user = await data.associatedUser
      const currentUser = context.authenticatedUser;
      
      if(user.id === currentUser.user.id) {
        this.setState(() => {
          return {
            courseTitle: data.title,
            courseAuthor: `${user.firstName} ${user.lastName}`,
            courseDescription: data.description,
            estimatedTime: data.estimatedTime,
            materialsNeeded: data.materialsNeeded,
            user
          }
        })
      } else {
        this.props.history.push('/forbidden');
      }
    }
    
  }

  componentDidMount() {
    this.getCourse();
  }

  render() {
    const {courseTitle, courseAuthor, courseDescription, estimatedTime, materialsNeeded} = this.state;
    return(
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          {
            this.state.errors.length > 0 ? 
            <ErrorsDisplay errors={this.state.errors} />:
            null
          }
          <form onSubmit={this.submit}>
            <div className="main--flex">
              <div>
                {/* insert value with API data to the input */}
                <label htmlFor="courseTitle">Course Title</label>
                <input onChange={this.change} id="courseTitle" name="courseTitle" type="text" value={courseTitle} />
                <label htmlFor="courseAuthor">Course Author</label>
                <input disabled='disabled' id="courseAuthor" name="courseAuthor" type="text" value={courseAuthor} />
                <label htmlFor="courseDescription">Course Description</label>
                <textarea onChange={this.change} id="courseDescription" name="courseDescription" value={courseDescription} />
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input onChange={this.change} id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} />
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea onChange={this.change} id="materialsNeeded" name="materialsNeeded" type="text" value={materialsNeeded} />
              </div>
            </div>
            <button className="button" type="submit">Update Course</button>
            <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
          </form>
        </div>
      </main>
    )
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      }
    })
  }

  submit = (e) => {
    e.preventDefault()
    const {courseTitle, courseDescription, estimatedTime, materialsNeeded, user} = this.state;
    const {id} = this.props.match.params;
    const {context} = this.props;

    const updatedCourse = {
      id,
      title: courseTitle,
      description: courseDescription,
      estimatedTime,
      materialsNeeded,
      userId: user.id
    }

    context.actions.updateCourse(id, updatedCourse)
      .then(errors => {
        if(errors !== null) {
          this.setState({errors})
        } else {
          this.props.history.push(`/courses/${id}`)
        }
      })
      .catch(err => {
        console.error(err);
        this.props.history.push('/error');
      })
  }

  cancel = (e) => {
    e.preventDefault();
    const {id} = this.props.match.params;
    const {from} = this.props.location.state || {from: {pathname: `/courses/${id}`}}
    this.props.history.push(from)
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