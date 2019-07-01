import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Form, Select, Button, Alert, DatePicker } from 'antd';
import 'antd/dist/antd.css';

import {cancelMess} from '../../redux/actions/messActions';

const { Option } = Select;

class CancelMeal extends React.Component {

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
            const values = {
                ...fieldsValue,
                'date': fieldsValue['date'].format('YYYY-MM-DD')
            };
            let studentMongoId=this.props.user._id;
            let date=values.date.split('-');
            let currentMeal=date[2]+'_'+date[1]+'_'+date[0]+'_'+values.meal+'_'+'-1';
            console.log(currentMeal);
            let data={
                currentMeal: currentMeal
            }
            this.props.cancelMess({studentMongoId, data});
        }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { msg } = this.state;
        const { cancelMessage } = this.props;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select a day!' }],
          };
        return (
            <div>
                <div style={{margin: 'auto', maxWidth: '500px'}}>
                    <h3 className="text-center">Cancel meal</h3>
                    {msg ? <Alert message={msg} type="error" /> : null}
                    {cancelMessage ? <Alert message={cancelMessage} type="success" /> : null}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="Meal">
                            {getFieldDecorator('meal', {
                            rules: [{ required: true, message: 'Please select your meal' }],
                            })(
                            <Select
                                placeholder="Select a meal"
                            >
                                <Option value='1'>Breakfast</Option>
                                <Option value='2'>Lunch</Option>
                                <Option value='3'>Snacks</Option>
                                <Option value='4'>Dinner</Option>
                            </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="Date">
                            {getFieldDecorator('date', config)(<DatePicker />)}
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
    cancelMessage: state.mess.cancelMessage,
    error: state.error
});

export default compose(
    connect(mapStateToProps, {cancelMess}),
    Form.create({ name: 'coordinated' })
  )(CancelMeal);