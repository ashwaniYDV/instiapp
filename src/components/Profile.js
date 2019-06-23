import React, { Component } from 'react';
import { connect } from 'react-redux';

import {updateUser} from '../redux/actions/userActions';
import {signOut} from '../redux/actions/authActions';

class Profile extends Component {
  state={
    email: '',
    instituteId: '',
    name: '',
    newpassword: '',
    confnewpassword: '',
    alertMessage: ''
  }

  signOut= async ()=> {
    //we need to call some actioncreators
    await this.props.signOut();
    if(!this.props.isAuth) {
      this.props.history.push('/');
    }
  }

  onChange=(e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    if ( this.state.newpassword!=="" && this.state.confnewpassword==="" ) {
      this.setState({
        alertMessage: "Please confirm your password !!!"
      })
      return;
    }
    if ( this.state.newpassword==="" && this.state.confnewpassword!=="" ) {
      this.setState({
        alertMessage: "Please enter both password fields !!!"
      })
      return;
    }
    if ( this.state.newpassword!==this.state.confnewpassword ) {
      this.setState({
        alertMessage: "Password do not match !!!"
      })
      return;
    }
    let body={};
    if ( this.state.name!=="" ) {
      body.name=this.state.name;
    }
    if ( this.state.email!=="" ) {
      body.email=this.state.email;
    }
    if ( this.state.instituteId!=="" ) {
      body.instituteId=this.state.instituteId;
    }
    if ( this.state.newpassword!=="" ) {
      body.password=this.state.newpassword;
    }
    this.setState({
      alertMessage: null
    })
    const update={
      updatedUser: body,
      userId: this.props.user._id
    }
    this.props.updateUser(update);
  }

  render() {
    const { newpassword, confnewpassword, alertMessage } = this.state;
    const { email, name, instituteId } = this.props.user;
    
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
            <button className="btn btn-danger" onClick={this.signOut}>SignOut</button>
          </div>
          <h3 className="text-center">Update Profile</h3>
          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <div className="container shadow">
              {alertMessage ? <div className="alert alert-danger">{alertMessage}</div> : null}
                <form onSubmit={this.handleSubmit} style={{padding: "20px", margin: "20px"}}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      name="email"
                      id="emal"
                      placeholder="Enter email"
                      className="form-control"
                      type="email"
                      defaultValue={ email }
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
                      defaultValue={ name }
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
                      defaultValue={ instituteId }
                      onChange={ this.onChange }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input 
                      name="newpassword"
                      id="newpassword"
                      placeholder="Enter new password"
                      className="form-control"
                      type="password"
                      value={ newpassword }
                      onChange={ this.onChange }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rePassword">Re-enter New Password</label>
                    <input 
                      name="confnewpassword"
                      id="confnewpassword"
                      placeholder="Re-enter password"
                      className="form-control"
                      type="password"
                      value={ confnewpassword }
                      onChange={ this.onChange }
                    />
                  </div>
                  <button className="btn btn-success" type="submit">Update Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ): 
      <h3 className="text-center text-danger">Please login again!</h3>

    );
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default connect( mapStateToProps, { updateUser, signOut } )(Profile);