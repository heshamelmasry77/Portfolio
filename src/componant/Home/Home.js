import React, { Component } from 'react';
import './Home.scss';
import MyInfo from './MyInfo/MyInfo'
import Projects from './Projects/Projects'
import ContactMe from './ContactMe/ContactMe'
import MyFooter from './MyFooter/MyFooter'
import ScrollUpButton from "react-scroll-up-button";
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {compose} from 'redux'
import AuthNavlinks from '../Navigation/AuthNavlinks'

class Home extends Component {
  constructor (){
    super ();
    this.state = {
      intervalId: 0,
      title: 'Nemo Adam'
    }
  }
  render() {
    const {projectsData, auth, profile} = this.props;
    const links = auth.uid ? <AuthNavlinks profile={profile} title={this.state.title}/> :
      <div className="myNav-container">
        <div className="my-name">
          <span>Nemo Adam</span>
        </div>
        <div className="scroll-spy">
          <a className="scroll-spy-item" href="/">Home</a>
          <a className="scroll-spy-item" href="#projects">Projects</a>
          <a className="scroll-spy-item" href="#contactMe">Contact Me</a>
        </div>
      </div>
    return (
      <div className="Home">
        <header className="Home-header" id="1">
          {links}
          <MyInfo />
        </header>
        <ScrollUpButton
          StopPosition={0}
          ShowAtPosition={150}
          EasingType='easeOutCubic'
          AnimationDuration={500}
          ContainerClassName='ScrollUpButton__Container'
          TransitionClassName='ScrollUpButton__Toggled'
        />
        <main id="projects">
          <Projects projectsData={projectsData}/>
        </main>
        <footer id="contactMe">
          <ContactMe />
          <MyFooter />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    projectsData: state.firestore.ordered.projects,
    auth:state.firebase.auth,
    profile: state.firebase.profile,
  }
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'projects', orderBy: ['createdAt', 'desc']},
    {collection:'projectLogo'}
  ])
)(Home)
