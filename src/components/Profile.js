import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/authActions';

class Profile extends Component {
  state={
    email: this.props.user.email,
    instituteId: this.props.user.instituteId,
    name: this.props.user.name,
    password: ""
  }

  onChange=(e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    
  }

  render() {
    console.log(this.state.user);
    return (
      this.props.isAuthenticated ? (
        <div className="container">
          <div className="row">
            <div className="col">
              <p>Name: {this.props.user.name}</p>
              <p>Email: {this.props.user.email}</p>
              <p>InstituteId: {this.props.user.instituteId}</p>
              <p>Batch: {this.props.user.batch}</p>
              <p>Branch: {this.props.user.branch}</p>
            </div>
          </div>
          <h3 className="text-center">Update Profile</h3>
          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <div className="container shadow">
                <form onSubmit={this.handleSubmit} style={{padding: "20px", margin: "20px"}}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      name="email"
                      id="emal"
                      placeholder="Enter email"
                      className="form-control"
                      type="email"
                      value={ this.state.email }
                      onChange={ this.onChange }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      name="name"
                      id="name"
                      placeholder="Enter name"
                      className="form-control"
                      type="text"
                      value={ this.state.name }
                      onChange={ this.onChange }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="instituteId">InstituteId</label>
                    <input 
                      name="instituteId"
                      id="instituteId"
                      placeholder="Enter instituteId"
                      className="form-control"
                      type="text"
                      value={ this.state.instituteId }
                      onChange={ this.onChange }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input 
                      name="password"
                      id="password"
                      placeholder="Enter password"
                      className="form-control"
                      type="password"
                      value={ this.state.password }
                      onChange={ this.onChange }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rePassword">Re-enter New Password</label>
                    <input 
                      name="rePassword"
                      id="rePassword"
                      placeholder="Re-enter password"
                      className="form-control"
                      type="password"
                    />
                  </div>
                  <button className="btn btn-success" type="submit">Update Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ): null


    );//
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default connect( mapStateToProps, actions )(Profile);