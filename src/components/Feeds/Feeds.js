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

    componentDidMount = () => {
        this.props.getAllFeeds();
    }

    render () {
        const { classes, feeds } = this.props;
        console.log(feeds);
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
    feeds: state.feed.feeds
});

export default compose(
    connect(mapStateToProps, { getAllFeeds }),
    withStyles(styles, { withTheme: true })
  )(Feeds);