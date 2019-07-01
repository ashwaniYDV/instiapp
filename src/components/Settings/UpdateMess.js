import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Form, Select, Button, Alert } from 'antd';
import 'antd/dist/antd.css';

import {updateMess} from '../../redux/actions/messActions';

const { Option } = Select;

class UpdateMess extends React.Component {

    state = {
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          if (error.id === "UPDATE_MESS_FAIL") {
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

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values, this.props.user._id);
            let studentMongoId=this.props.user._id;
            let data={
                messChoice: values.messChoice
            }
            this.props.updateMess({studentMongoId, data});
        }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { msg } = this.state;
        const { updateMessage } = this.props;
        return (
            <div>
                <div style={{margin: 'auto', maxWidth: '500px'}}>
                    <h3 className="text-center">Update mess</h3>
                    {msg ? <Alert message={msg} type="error" /> : null}
                    {updateMessage ? <Alert message="Mess updated successfully" type="success" /> : null}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="Mess Choice">
                            {getFieldDecorator('messChoice', {
                            rules: [{ required: true, message: 'Please select your mess!' }],
                            })(
                            <Select
                                placeholder="Select mess"
                            >
                                <Option value='1'>Mess 1</Option>
                                <Option value='2'>Mess 2</Option>
                                <Option value='3'>Mess 3</Option>
                                <Option value='4'>Mess 4</Option>
                            </Select>,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>    
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    updateMessage: state.mess.updateMessage,
    error: state.error
});

export default compose(
    connect(mapStateToProps, {updateMess}),
    Form.create({ name: 'coordinated' })
  )(UpdateMess);