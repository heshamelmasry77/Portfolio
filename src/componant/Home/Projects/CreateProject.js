import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createProject } from '../../../Store/Actions/ProjectsActions'
import {Redirect} from "react-router-dom";

class CreateProject extends Component {
  constructor(){
    super();
    this.state = {
      projectName:'',
      description:'',

    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.id] : e.target.value
    })
  };

  handleSubmit = (e) =>{
    e.preventDefault();
    // console.log(this.state)
    {/*<Redirect to="/dashboard"/>*/}
    this.props.createProject(this.state)
    this.props.history.push('/');
  };
  render() {
    const {auth} = this.props
    return (
      <div>
        {!auth.uid ? <Redirect to='/signin'/> :
          <div>
            <h1>Create New Project</h1>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input type="text"   id="projectName" onChange={this.handleChange}/>
                <textarea   id="description" onChange={this.handleChange}/>
              </div>
              <div>
                <button type="submit">CreateProject</button>
              </div>
            </form>
          </div>
        }
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
  return{
    auth:state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    createProject: (project) => dispatch(createProject(project))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);