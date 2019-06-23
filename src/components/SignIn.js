import React, { Component } from 'react';
import { compose } from 'redux';
import 'antd/dist/antd.css';
import './LoginModal.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from "../redux/actions/authActions";
import { clearErrors } from "../redux/actions/errorActions";
import { Form, Input, Icon, Alert, Button } from "antd";

class SignIn extends Component {
  state = {
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
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

  handleCreate = async ({email,password}) => {
    const user = {
      email,
      password,
    };

    await this.props.signIn(user);
    if (this.props.isAuthenticated){
      this.props.history.push('/profile');
    }
  };
  onEnterKeyPress = (e)=>{
    if(e.key === 'Enter'){
      this.handleSubmit(e)
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handleCreate(values);
      }
    });
  };


  render() {
    const { msg } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="vertical" className="login-form" onSubmit={this.handleSubmit} onKeyPress={this.onEnterKeyPress}>
          {msg ? <Alert message={msg} type="error" /> : null}
          <br/>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter valid email!' },],
            })(
              <Input
              type="email"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
                type="password"
              />,
            )}
          </Form.Item>
          <Button key="submit" type="primary" loading={this.props.isLoading} onClick={this.handleSubmit}>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  error: state.error
});

export default compose(
  connect(mapStateToProps,{ signIn, clearErrors }),
  Form.create({ name: 'normal_login' })
)(SignIn);