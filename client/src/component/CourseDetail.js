import React from 'react';
import {Link} from 'react-router-dom';

export default class CourseDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      user: {},
      paragraphs: [],
      materials: [],
    }
  }

  getCourse = async () => {
    const { context } = this.props
    const { id } = this.props.match.params
    const data = await context.actions.getCourse(id);
    const user = await data.associatedUser
    this.setState(() => {
      return {
        data,
        user,
        paragraphs: data.description.split(/\r?\n/),
        materials: data.materialsNeeded !== null ? data.materialsNeeded.replaceAll('*', '').split(/\r?\n/) : []
      }
    })
  }

  componentDidMount() {
    this.getCourse();
  }

  render(){
    const { data, user, paragraphs, materials } = this.state;
    return(
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <Link className="button" to='/update'>Update Course</Link>
            <Link className="button" to='/delete'>Delete Course</Link>
            <Link className="button button-secondary" to='/course'>Return to List</Link>
          </div>
        </div>
        <div className ="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{data.title}</h4>
                <p>{`By ${user.firstName} ${user.lastName}`}</p>
                {paragraphs.map((paragraph,i) => <p key={i}>{paragraph}</p>)}
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{data.estimatedTime !== null ? data.estimatedTime : null}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {materials.map((material,i) => i === materials.length - 1 ? null : <li key={i}>{material}</li>)}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
      
    )
  }
}

