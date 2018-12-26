import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import './Styles/MessageDetails.scss'
// import ContactMe from '../ContactMe/ContactMe'
import AuthNavlinks from '../../Navigation/AuthNavlinks'

const MessageDetails = (props) => {
  const { message } = props;
  // console.log(message);
  if (message) {
    return(
      <div className="MessageDetails">
        <header>
          <AuthNavlinks/>
        </header>
        <div className="details">
          <div className="first-container">
          <div className="double-container">
            <h2><a href={`mailto:${message.email}`}>{message.email}</a></h2>
            <h2>{message.phoneNumber}</h2>
            </div>
            <p>{message.description}</p>
          </div>
          <div className="double-container">
            <div>Author: {message.contactName}</div>
            <div>Created At: {message.sentAt.toDate().toDateString()}</div>
          </div>
        </div>
        <footer></footer>
      </div>
    )
  } else {
    return (
      <div>
        <p>message loading...</p>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) =>{
  const id = ownProps.match.params.id;
  const contactedMe = state.firestore.data.contactedMe;
  const message = contactedMe ? contactedMe[id]: null;
  return { message }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'contactedMe'}
  ])
)(MessageDetails)