import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Spin, Alert } from "antd";
import "antd/dist/antd.css";

import { getUserFeeds, deleteFeed } from "../../redux/actions/feedActions";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  }
});

class FeedUser extends Component {
  state = {
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "ALL_FEEDS_FAIL") {
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

  componentDidMount = () => {
    this.props.getUserFeeds();
  };

  handleDelete = async id => {
    await this.props.deleteFeed(id);
    this.props.getUserFeeds();
  };

  render() {
    const { classes, feeds, feed } = this.props;
    const { msg } = this.state;
    const userFeedList =
      feeds && !feed.feedsLoading
        ? feeds.map(feed => {
            let date = new Date(feed.eventDate).toDateString().toString();
            return (
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center"
                }}
                key={feed._id}
              >
                <div>
                  <Card className={classes.card}>
                    <CardActionArea>
                      {feed.eventImageUrl &&
                      feed.eventImageUrl !== "placeholder" ? (
                        <CardMedia
                          component="img"
                          alt={feed.name}
                          className={classes.media}
                          height="140"
                          image={feed.eventImageUrl}
                          title={feed.eventImageUrl}
                        />
                      ) : null}
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {feed.eventName}
                        </Typography>
                        <small className="text-muted">{date}</small>
                        <br />
                        <br />
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        <Fab color="primary" variant="extended" size="small" className={classes.fab} component={Link} to={{pathname: '/editfeed', state: {feed: feed}}} >
                            <EditIcon className={classes.extendedIcon} />
                            Edit
                        </Fab>
                        <Fab color="secondary" variant="extended" size="small" className={classes.fab} onClick={()=>{this.handleDelete(feed._id)}} >
                            <DeleteIcon className={classes.extendedIcon} />
                            Delete
                        </Fab>
                      </div>
                    </CardActions>
                  </Card>
                </div>
              </div>
            );
          })
        : [
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              key="spinner"
            >
              <Spin tip="Loading..." size="large"></Spin>
            </div>
          ];

    return (
      <div style={{ margin: "20px" }}>
        {msg ? <Alert message={msg} type="error" /> : null}
        {userFeedList.length ? (
          userFeedList
        ) : (
          <Alert message="No user feeds found!" type="warning" />
        )}
      </div>
    );
  }
}

FeedUser.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  feed: state.feed,
  feeds: state.feed.feeds,
  error: state.error
});

export default compose(
  connect(
    mapStateToProps,
    { getUserFeeds, deleteFeed }
  ),
  withStyles(styles, { withTheme: true })
)(FeedUser);
