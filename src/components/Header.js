import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

class Header extends Component {

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Notifications</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/signout">Sign Out</NavLink>
                </li>
            </ul>
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item" key="signin">
              <NavLink className="nav-link" to="/signin">Sign In</NavLink>
              </li>
              <li className="nav-item" key="signin">
              <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);