import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import {signIn} from '../redux/actions/authActions';
import CustomInput from './CustomInput';

class SignIn extends Component {

  state = {
    msg: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
  };

  componentDidUpdate = (prevProps) => {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          msg: error.message
        });
      } else {
        this.setState({
          msg: null
        });
      }
    }
  }
  
  //use arrow functions for automatic binding this keyword
  onSubmit=async (formData)=> { 
    //we need to call some actioncreators
    console.log(formData);
    await this.props.signIn(formData);
    if (this.props.isAuthenticated){
      this.props.history.push('/profile');
    }
  }
 
  render() {
    const {handleSubmit}=this.props;
    console.log(this.props.error);
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

              { this.state.msg ? 
                <div className="alert alert-danger">{ this.state.msg }</div>
                : null 
              }

              <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    errorMessage: state.error.message,
    errorId: state.error.id,
  }
}

export default compose(
  connect( mapStateToProps, {signIn} ),
  reduxForm({ form: 'signin' })
)(SignIn);