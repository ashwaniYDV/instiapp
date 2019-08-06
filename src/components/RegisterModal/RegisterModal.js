import React, { Component } from 'react';
import { compose } from 'redux';
import 'antd/dist/antd.css';
import './RegisterModal.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Alert, Icon, Button } from 'antd';
import {
  signUp,
  openLoginModal,
  closeRegisterModal
} from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";

class RegisterModal extends Component {
  state = {
    visible: this.props.openregisterModal,
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    openregisterModal: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    openLoginModal: PropTypes.func.isRequired,
    closeRegisterModal: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({
          msg: error.message
        });
      } else {
        this.setState({
          msg: null
        });
      }
    }

    if (this.state.visible) {
      if (isAuthenticated) {
        this.toggleModal();
      }
    }
  }

  toggleModal = () => {
    this.props.clearErrors();
    this.props.closeRegisterModal();
  };

  handleCancel = () => {
    this.toggleModal();
  };

  handleCreate = ({ name, email, password, instituteId, phone }) => {
    const newUser = {
      name,
      email,
      password,
      instituteId,
      phone
    };
    this.props.signUp(newUser);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handleCreate(values);
      }
    });
  };


  openLoginModal = () => {
    this.props.clearErrors();
    this.props.openLoginModal();
  };

  onEnterKeyPress = (e)=>{
    if(e.key === 'Enter'){
      this.handleSubmit(e)
    }
  }

  render() {
    const { visible, msg } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="vertical" className="register-form" onSubmit={this.handleSubmit} onKeyPress ={this.onEnterKeyPress}>
          <Modal
            visible={visible}
            title="Register"
            okText="Register"
            onCancel={this.handleCancel}
            onOk={this.handleSubmit}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" loading={this.props.isLoading} onClick={this.handleSubmit}>
                Register
              </Button>,
            ]}
          >
            {msg ? <Alert message={msg} type="error" /> : null}
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(
                <Input
                  type="text"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Name"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, pattern: new RegExp(""), message: 'Please enter valid IIT-P webmail!' },],
              })(
                <Input
                  type="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="IIT-P Webmail Eg xxxx@iitp.ac.in"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('instituteId', {
                rules: [{ required: true, message: 'Please enter your IIT-P Roll no.!' }],
              })(
                <Input
                  type="text"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="IIT-P Roll no."
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please enter phone number!' }],
              })(
                <Input
                  type="text"
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Phone"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input
                  type="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <br></br>
            Already have an account?
            <button className="newbutton2" onClick={this.openLoginModal}>Login</button>
          </Modal>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  error: state.error,
  openregisterModal: state.auth.openregisterModal
});

export default compose(
  connect(mapStateToProps, { signUp, clearErrors, openLoginModal, closeRegisterModal }),
  Form.create({ name: 'normal_register' })
)(RegisterModal);