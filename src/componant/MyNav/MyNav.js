import React, { Component } from 'react'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './MyNav.scss'

export default class MyNav extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(selectedKey) {

    // alert(`selected ${selectedKey}`);
  }
  render() {
    return (
      <div className="MyNav">
        <div >
          <Nav bsStyle="pills" onSelect={this.handleSelect()}>
            <NavItem eventKey={1} href="header">
              ABOUT
            </NavItem>
            <NavItem eventKey={2} title="main">
              PROJECTS
            </NavItem>
            <NavItem eventKey={3} title="footer">
              CONTACT ME
            </NavItem>
          </Nav>
        </div>
      </div>
    )
  }
}