import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginRequired from '../LoginRequired/LoginRequired';
import ActiveRequired from '../ActiveRequired/ActiveRequired';

import './Profile.css';

import {updateUser} from '../../redux/actions/userActions';
import {signOut} from '../../redux/actions/authActions';

class Profile extends Component {
  state={
    email: '',
    instituteId: '',
    name: '',
    phone: '',
    newpassword: '',
    confnewpassword: '',
    alertMessage: ''
  }

  signOut= async ()=> {
    await this.props.signOut();
    if(!this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange=(e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    
    if(this.props.isAuthenticated) {
      const { newpassword, confnewpassword, alertMessage } = this.state;
      const { email, name, instituteId } = this.props.user;
      return (
        <div className="wrapper">
          <div className="main-profile">
            <aside className="profile-card">
              <header>
                <a target="_blank" href="#">
                  <img src="http://lorempixel.com/150/150/people/" className="hoverZoomLink" />
                </a>
                <h1>John Doe</h1>
                <h2>Better Visuals</h2>
              </header>
              <div className="profile-bio">
                <p>
                  It takes monumental improvement for us to change how we live our lives. Design is the way we access that improvement.
                </p>
              </div>
              <ul className="profile-social-links">
                <li>
                  <a target="_blank" href="https://www.facebook.com/creativedonut">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://twitter.com/dropyourbass">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://github.com/vipulsaxena">
                    <i className="fa fa-github"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.behance.net/vipulsaxena">
                    <i className="fa fa-behance"></i>
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

export default connect( mapStateToProps, { updateUser, signOut } )(Profile);