import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Spin, Alert } from 'antd';
import 'antd/dist/antd.css';

import {getAllFeeds} from '../../redux/actions/feedActions';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
});

class Feeds extends Component {

    state = {
        msg: null
    }

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
        this.props.getAllFeeds();
    }

    render () {
        const { classes, feeds } = this.props;
        const { msg } = this.state;
        const feedList = this.props.feed.feeds && !this.props.feed.feedsLoading ? (feeds.map((feed) => {
          let date=new Date(feed.eventDate).toDateString().toString();
          return (
            <Link to={`/feed/${feed._id}`} key={feed._id}>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h6" component="h3">
                        {feed.eventName}
                    </Typography>
                    <small className="text-muted">{date}</small><br/><br/>
                    <Typography component="p">
                        {feed.eventDescription.substr(0,200)} 
                        {feed.eventDescription.length>200 ? <span> [...]</span> : null}
                    </Typography>
                </Paper>
            </Link>
          )
        })
        ) : (
            [<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} key="spinner">
              <Spin tip="Loading..." size="large" ></Spin>
            </div>]
          )
        
        return (
            <div style={{margin: '20px', maxWidth: '600px'}}>
                {msg ? <Alert message={msg} type="error" /> : null}
                {feedList.length ? feedList : <Alert message="No feeds found!" type='warning' />}
            </div>
        );
    }
}

Feeds.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    feed: state.feed,
    feeds: state.feed.feeds,
    error: state.error
});

export default compose(
    connect(mapStateToProps, { getAllFeeds }),
    withStyles(styles, { withTheme: true })
  )(Feeds);