import React from 'react';
import {Link} from 'react-router-dom';

export default class Courses extends React.Component {
  constructor(){
    super();
    this.state = {
      courses: [],
    }
  }
  getAllCourses = async () => {
    const { context } = this.props
    const allCourses = await context.actions.getCourses(); 
    if(allCourses !== null) {
      this.setState(() => {
        return {
          courses: allCourses
        }
      })
    }
  }
  componentDidMount() {
    this.getAllCourses();
  }
  
  render() {
    const { courses } = this.state
    const allCourses = courses.map((courses) => {
      return(
        <React.Fragment key={courses.id}>
          <Link className="course--module course--link" to={`/courses/${courses.id}`}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{courses.title}</h3>
          </Link>
        </React.Fragment>
      )
    })
    return(
      <main>
        <div className="wrap main--grid">
          {allCourses}
          <Link className="course--module course--add--module" to={`/courses/create`}>
            <span className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                New Course
            </span>
        </Link>
        </div>
      </main>
    );
  }
}