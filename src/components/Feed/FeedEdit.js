import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { Form, Button, Alert, DatePicker, Input } from "antd";
import "antd/dist/antd.css";

import LoginRequired from "../LoginRequired/LoginRequired";
import { editFeed } from "../../redux/actions/feedActions";

const { TextArea } = Input;

class FeedEdit extends React.Component {
  state = {
    msg: null,
    loading: false
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "EDIT_FEED_FAIL") {
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
          ...fieldsValue
        };
        let datedata = values.eventDate._d;
        values.eventDate = new Date(datedata).getTime();
        console.log(values);
        this.editPost(values);
      }
    });
  };

  editPost = async data => {
    this.setState({
      loading: true
    });
    let feedId = this.props.location.state.feed._id;
    console.log(feedId, data);
    await this.props.editFeed({ data, feedId });
    this.props.history.push("/userfeeds");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { msg } = this.state;

    const { feed } = this.props.location.state;

    if (this.props.isAuthenticated) {
      return (
        <div>
          <div
            style={{ margin: "auto", maxWidth: "550px", padding: "20px 50px" }}
          >
            <h3 className="text-center">Edit Feed</h3>
            {msg ? <Alert message={msg} type="error" /> : null}
            <Form.Item label="Feed title">
              {getFieldDecorator("eventName", {
                rules: [
                  { required: true, message: "Please enter feed title!" }
                ],
                initialValue: feed.eventName
              })(<Input type="text" placeholder="Enter feed title" />)}
            </Form.Item>
            <Form.Item label="Venue">
              {getFieldDecorator("eventVenue", {
                rules: [{ required: false }],
                initialValue: feed.eventVenue
              })(<Input type="text" placeholder="Enter venue" />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator("eventDescription", {
                rules: [
                  { required: true, message: "Please enter description!" }
                ],
                initialValue: feed.eventDescription
              })(
                <TextArea type="text" placeholder="Enter description of feed" />
              )}
            </Form.Item>
            <Form.Item label="Date">
              {getFieldDecorator("eventDate", {
                rules: [{ required: true, message: "Please select date!" }]
              })(<DatePicker />)}
            </Form.Item>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.loading}
                >
                  Edit Feed
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      );
    } else {
      return <LoginRequired />;
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default compose(
  connect(
    mapStateToProps,
    { editFeed }
  ),
  Form.create({ name: "edit" })
)(FeedEdit);
