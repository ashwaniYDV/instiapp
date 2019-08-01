import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Form, Select, Button, Alert, DatePicker, TimePicker, Input } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

import LoginRequired from '../LoginRequired/LoginRequired';
import {editLostnfounds} from '../../redux/actions/lostnfoundActions';

const { Option } = Select;
const { TextArea } = Input;

class LostAndFoundEdit extends React.Component {

    state = {
        msg: null,
        loading: false
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          if (error.id === "EDIT_LOSTANDFOUND__FAIL") {
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
            this.editPost(values);
        }
        });
    };

    editPost = async (data) => {
        this.setState({
            loading: true
        });
        let lostnfoundId = this.props.location.state.lostnfound._id;
        console.log(lostnfoundId, data);
        await this.props.editLostnfounds({data, lostnfoundId});
        this.props.history.push('/lost-n-found/user');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { msg } = this.state;

        const {lostnfound} = this.props.location.state;

        if(this.props.isAuthenticated) {
            return (
                <div>
                    <div style={{margin: 'auto', maxWidth: '550px', padding: '20px 50px'}}>
                        <h3 className="text-center">Edit Lost-n-found</h3>
                        {msg ? <Alert message={msg} type="error" /> : null}
                            <Form.Item label="Name of item">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please enter item name!' }],
                                initialValue: lostnfound.name
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
                                initialValue: lostnfound.place
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
                                initialValue: lostnfound.description
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
                                initialValue: lostnfound.contact
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
                                initialValue: lostnfound.address
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
                                initialValue: moment(lostnfound.date, 'DD-MM-YYYY')
                            })(
                                <DatePicker/>
                            )}
                            </Form.Item>
                            <Form.Item label="Time">
                            {getFieldDecorator('time', {
                                rules: [{ required: true, message: 'Please select time!' }],
                                initialValue: moment(lostnfound.time, 'HH:mm:ss')
                            })(
                                <TimePicker/>
                            )}
                            </Form.Item>
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
                                    <Option value='3'>Item has been recovered</Option>
                                </Select>,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={this.state.loading}>Edit Post</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>    
            );
        } else {
            return (
                <LoginRequired/>
            )
        }
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default compose(
    connect(mapStateToProps, {editLostnfounds}),
    Form.create({ name: 'edit' })
  )(LostAndFoundEdit);