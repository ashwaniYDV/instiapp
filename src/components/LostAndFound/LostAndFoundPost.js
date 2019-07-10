import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Form, Select, Button, Alert, DatePicker, TimePicker, Input } from 'antd';
import 'antd/dist/antd.css';

import {postLostnfounds} from '../../redux/actions/lostnfoundActions';

const { Option } = Select;
const { TextArea } = Input;

class LostAndFoundPost extends React.Component {

    state = {
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          if (error.id === "CANCEL_MESS_FAIL") {
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
        this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
            let values = {
                ...fieldsValue,
                'date': fieldsValue['date'].format('DD-MM-YYYY'),
                'time': fieldsValue['time'].format('HH:mm:ss'),
            };
            values.lostnfoundPoster=this.props.user._id;
            console.log(values);
            this.post(values);
        }
        });
    };

    post = async (values) => {
        await this.props.postLostnfounds(values);
        this.props.history.push('/lost-n-found');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { msg } = this.state;

        return (
            <div>
                <div style={{margin: 'auto', maxWidth: '550px', padding: '20px 50px'}}>
                    <h3 className="text-center">Post Lost-n-found</h3>
                    {msg ? <Alert message={msg} type="error" /> : null}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="Lost-n-found Status">
                            {getFieldDecorator('lostStatus', {
                            rules: [{ required: true, message: 'Please select status' }],
                            })(
                            <Select
                                placeholder="Select status"
                            >
                                <Option value='1'>You have lost this item</Option>
                                <Option value='2'>You have found this item</Option>
                            </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="Name of item">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter item name!' }],
                        })(
                            <Input
                            type="text"
                            placeholder="Enter name of item"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item label="Place">
                        {getFieldDecorator('place', {
                            rules: [{ required: true, message: 'Please enter place!' }],
                        })(
                            <Input
                            type="text"
                                placeholder="Enter place"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item label="Description">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please enter description!' }],
                        })(
                            <TextArea
                            type="text"
                            placeholder="Enter short description of item"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item label="Contact">
                        {getFieldDecorator('contact', {
                            rules: [{ required: true, message: 'Please enter your contact number!' }],
                        })(
                            <Input
                            type="number"
                            placeholder="Enter mobile number"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item label="Address">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Please enter address!' }],
                        })(
                            <Input
                            type="text"
                                placeholder="Enter address"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item label="Date">
                        {getFieldDecorator('date', {
                            rules: [{ required: true, message: 'Please select date!' }],
                        })(
                            <DatePicker/>
                        )}
                        </Form.Item>
                        <Form.Item label="Time">
                        {getFieldDecorator('time', {
                            rules: [{ required: true, message: 'Please select time!' }],
                        })(
                            <TimePicker/>
                        )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Post</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>    
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    cancelMessage: state.mess.cancelMessage,
    error: state.error
});

export default compose(
    connect(mapStateToProps, {postLostnfounds}),
    Form.create({ name: 'coordinated' })
  )(LostAndFoundPost);