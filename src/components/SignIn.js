import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import CustomInput from './CustomInput';

class SignIn extends Component {
  
  //use arrow functions for automatic binding this keyword
  onSubmit=async (formData)=> {
    //we need to call some actioncreators
    console.log(formData);
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

              {/* { this.props.errorMessage ? 
                <div className="alert alert-danger">{ this.props.errorMessage }</div>
                : null 
              } */}

              <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}



export default reduxForm({ form: 'signin' })(SignIn);