import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../redux/actions/authActions';
import CustomInput from './CustomInput';

class SignUp extends Component {
  
  //use arrow functions for automatic binding this keyword
  onSubmit=async (formData)=> { 
    //we need to call some actioncreators
    console.log(formData);
    await this.props.signUp(formData);
    if (this.props.isAuthenticated){
      this.props.history.push('/profile');
    }
  }
 
  render() {
    const {handleSubmit}=this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
                <Field
                  name="name"
                  type="text"
                  id="name"
                  label="Enter your name"
                  placeholder="Name"
                  component= {CustomInput} />
              </fieldset>
              <fieldset>
                <Field
                  name="instituteId"
                  type="text"
                  id="instituteId"
                  label="Enter instituteId"
                  placeholder="InstituteId"
                  component= {CustomInput} />
              </fieldset>
              <fieldset>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  label="Enter your email"
                  placeholder="example@example.com"
                  component= {CustomInput} />
              </fieldset>
              <fieldset>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  label="Enter your password"
                  placeholder="*****"
                  component= {CustomInput} />
              </fieldset>

              { this.props.errorMessage ? 
                <div className="alert alert-danger">{ this.props.errorMessage }</div>
                : null 
              }

              <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.errorMessage,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default compose(
  connect( mapStateToProps, actions ),
  reduxForm({ form: 'signup' })
)(SignUp);