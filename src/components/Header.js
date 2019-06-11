import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../redux/actions/authActions';

class Header extends Component {

  signOut = () => {
    this.props.signOut();
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Notifications</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          { this.props.isAuthenticated ? 
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={this.signOut}>Sign Out</NavLink>
                </li>
            </ul>
          </div>
          :
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <NavLink className="nav-link" to="/signin">Sign In</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                </li>
            </ul>
          </div> }
        </div>
      </nav>
    );
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default compose(
  connect( mapStateToProps, actions ),
  withRouter
)(Header);