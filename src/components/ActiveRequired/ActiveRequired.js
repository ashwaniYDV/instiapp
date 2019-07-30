import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Modal, Form, Input, Icon, Alert, Button } from "antd";

import { activateUser } from "../../redux/actions/authActions";
import { flexbox } from '@material-ui/system';

const styles = theme => ({
  root: {
      width: '100%',
      padding: '25px'
  },
  button: {
      margin: theme.spacing.unit,
  },
});
class ActiveRequired extends React.Component {

  state = {
    visible: false,
    msg: null
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "ACTIVATION_FAIL") {
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

  openActivateModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    })
  };

  handleCreate = (values) => {
    console.log(values.code);
    let code = parseInt(values.code);
    let email = this.props.user.email;
    let data = {
      email,
      code
    }
    this.props.activateUser(data);
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
    const { visible, msg } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { classes, theme } = this.props;
    return (
      <div className={classes.root} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column'}}>
        <Typography gutterBottom>
          Please activate your account to view all of this page!
        </Typography>
        <Button type="danger" ghost className={classes.button} onClick={this.openActivateModal}>
          Activate
        </Button>
        {/* Modal */}
        <Form layout="vertical" className="login-form" onSubmit={this.handleSubmit} onKeyPress={this.onEnterKeyPress}>
          <Modal
            visible={visible}
            title="Activate your account"
            okText="Activate"
            onCancel={this.handleCancel}
            onOk={this.handleSubmit}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" loading={this.props.isLoading} onClick={this.handleSubmit}>
                Activate
              </Button>,
            ]}
          >
            {msg ? <Alert message={msg} type="error" /> : null}
              Enter the OTP sent to your webmail.
              <Form.Item>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: 'Please enter activation code' },],
              })(
                <Input
                type="number"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="OTP"
                />,
              )}
            </Form.Item>
            Didn't received the activation code?
            <button className="newbutton">Resend activation code</button>
          </Modal>
        </Form>


      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  error: state.error
});

export default compose(
  connect(mapStateToProps,{ activateUser }),
  Form.create({ name: 'normal_activate' }),
  withStyles(styles, { withTheme: true }),
)(ActiveRequired);