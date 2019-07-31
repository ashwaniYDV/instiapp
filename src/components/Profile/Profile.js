import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginRequired from '../LoginRequired/LoginRequired';
import ActiveRequired from '../ActiveRequired/ActiveRequired';

import './Profile.css';

class Profile extends Component {

  render() {
    
    if(this.props.isAuthenticated) {
      return (
        <div className="wrapper" style={{background: "red"}}>
          <div className="main-profile">
            <aside className="profile-card">
              <header>
                <a target="_blank" href="#">
                  <img src="https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-9/983800_794192833955569_1199485730900769114_n.jpg?_nc_cat=103&_nc_oc=AQk5zxHhhdwdXMIoO9dsVPnDI-3DEDOgOLcyaY1ta6_4Avp1UqPb0No_83OiTlaK8Xk&_nc_ht=scontent-bom1-1.xx&oh=ccf9056308c5623246aaa2ff8e1d4dad&oe=5DDAEF83" className="hoverZoomLink" />
                </a>
              </header>
              <div className="profile-bio">
                <h1>{ this.props.user.name }</h1>
                <h2>{ this.props.user.instituteId }</h2>
                <p>
                  Webmail: { this.props.user.email }
                </p>
              </div>
              <ul className="profile-social-links" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <li>
                  <a target="_blank" href="https://www.facebook.com">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://twitter.com">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://github.com">
                    <i className="fa fa-github"></i>
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      )
    } else if (this.props.user.active === 0) {
      return (
        <ActiveRequired/>
      )
    } else {
      return (
        <LoginRequired/>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default connect( mapStateToProps, {} )(Profile);