import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { storage } from '../../firebase';

import { Form, Button, Alert, DatePicker, Input, Progress } from 'antd';
import 'antd/dist/antd.css';

import LoginRequired from '../LoginRequired/LoginRequired';
import {postFeed} from '../../redux/actions/feedActions';

const { TextArea } = Input;

class FeedPost extends React.Component {

    state = {
        msg: null,
        image: null,
        url: '',
        progress: null,
        loading: false
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          if (error.id === "POST_FEED__FAIL") {
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

    onChange = (e) => {
        this.setState({
            image: e.target.files[0]
        });
    }

    uploadImage = (e) => {
        e.preventDefault();
        let { image } = this.state;
        if (image !== null) {
            const uploadTask = storage.ref(`feeds/${image.name}`).put(image);
            uploadTask.on('state_changed', (snapshot) => {
                let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress: progress});
            }, (error) => {
                console.log(error);
            }, () => {
                storage.ref('feeds').child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({
                        url: url
                    });
                })
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
            let values = {
                ...fieldsValue,
            };
            let datedata=values.eventDate._d;
            values.eventDate=new Date(datedata).getTime();
            values.feedPoster=this.props.user._id;
            if (this.state.url !== '') {
                values.eventImageUrl = this.state.url;
            }
            console.log(values);
            this.post(values);
        }
        });
    };

    post = async (values) => {
        this.setState({
            loading: true
        });
        await this.props.postFeed(values);
        this.props.history.push('/feeds');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { msg } = this.state;

        if(this.props.isAuthenticated) {
            return (
                <div>
                    <div style={{margin: 'auto', maxWidth: '550px', padding: '20px 50px'}}>
                        <h3 className="text-center">Post Feed</h3>
                        {msg ? <Alert message={msg} type="error" /> : null}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="Feed Title">
                            {getFieldDecorator('eventName', {
                                rules: [{ required: true, message: 'Please enter feed title!' }],
                            })(
                                <Input
                                type="text"
                                placeholder="Enter feed title"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item label="Upload picture">
                                <input type="file" className="btn btn-primary" onChange={this.onChange}/>
                                <button className="btn btn-success" onClick={this.uploadImage}>Upload</button>
                                <Progress percent={this.state.progress} status="active" />
                            </Form.Item>
                            <Form.Item label="Venue">
                            {getFieldDecorator('eventVenue', {
                                rules: [{ required: false}],
                            })(
                                <Input
                                type="text"
                                    placeholder="Enter venue"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item label="Description">
                            {getFieldDecorator('eventDescription', {
                                rules: [{ required: true, message: 'Please enter description!' }],
                            })(
                                <TextArea
                                type="text"
                                placeholder="Enter description of feed"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item label="Date">
                            {getFieldDecorator('eventDate', {
                                rules: [{ required: true, message: 'Please select date!' }],
                            })(
                                <DatePicker/>
                            )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={this.state.loading}>Post Feed</Button>
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
    connect(mapStateToProps, {postFeed}),
    Form.create({ name: 'coordinated' })
  )(FeedPost);