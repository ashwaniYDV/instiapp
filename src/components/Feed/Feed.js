import React, {Component} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Row, Col, Skeleton, PageHeader, Button } from 'antd';
import 'antd/dist/antd.css';

import {getFeed} from '../../redux/actions/feedActions';
import './feed.css';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
  },
});

class Feeds extends Component {

    componentDidMount() {
        const feedId = this.props.match.params.feedId;
		this.props.getFeed(feedId);
	}

    render () {
        const { classes } = this.props;
        const { feedData } = this.props;
        const feed = feedData && !this.props.feed.feedLoading ? (
            <div>
                <Row>
                    <Col md={24} lg={12}>
                        <div className="column-1">
                        <PageHeader
                                onBack={() => window.history.back()}
                                title={<span style={{color: '#fff'}}>{feedData.eventName}</span>}
                                style={{background: '#1F80C8', color: '#fff', padding: '5px'}}
                            >
                            </PageHeader>
                            <div style={{width: '100%'}}>
                                <img src={feedData.eventImageUrl} width="100%" />
                            </div>
                            <PageHeader
                                title={<span style={{color: '#fff'}}>{new Date(feedData.eventDate).toDateString().toString()}</span>}
                                extra={[
                                <Button key="1">link1</Button>,
                                <Button key="2">link2</Button>,
                                ]}
                                style={{background: '#1F80C8', color: '#fff', padding: '5px'}}
                            >
                                <p style={{color: '#fff'}}>Venue: {feedData.eventVenue}</p>
                            </PageHeader>
                            <p>Posted by: {feedData.feedPoster}</p>
                        </div>
                    </Col>
                    <Col md={24} lg={12}>
                        <div className="column-2">
                            <h3>{feedData.eventName}</h3>
                            <Paper>
                                <p>{feedData.eventDescription}</p>
                            </Paper>
                        </div>
                    </Col>
                </Row>
            </div>
		) : null
        
        return (
            <div>
                <Skeleton loading={this.props.feed.feedLoading} active paragraph={{ rows: 10 }} avatar>
                    {feed}
                </Skeleton>
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
    feedData: state.feed.feed
});

export default compose(
    connect(mapStateToProps, { getFeed }),
    withStyles(styles, { withTheme: true })
  )(Feeds);