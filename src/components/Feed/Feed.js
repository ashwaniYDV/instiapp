import React, {Component} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Row, Col, Skeleton, PageHeader, Button, Alert } from 'antd';
import 'antd/dist/antd.css';

import {getFeed} from '../../redux/actions/feedActions';
import './feed.css';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
  },
});

class Feed extends Component {

    state = {
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          if (error.id === "FEED_FAIL") {
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

    componentDidMount() {
        const feedId = this.props.match.params.feedId;
		this.props.getFeed(feedId);
    }

    render () {
        const { classes } = this.props;
        const { feedData } = this.props;
        const { msg } = this.state;
        let result = null;
        let doc = null;
        if (feedData && !this.props.feed.feedLoading) {
            var md = require('markdown-it')({
                html: true,
                linkify: true,
                typographer: true
              });
            result = md.render(feedData.eventDescription);
            // doc = new DOMParser().parseFromString(result, "text/xml");

        }
        const feed = feedData && !this.props.feed.feedLoading ? (
            <div>
                <Row>
                    {msg ? <Alert message={msg} type="error" /> : null}
                    <Col md={24} lg={12}>
                        <div className="column-1">
                        <PageHeader
                                onBack={() => window.history.back()}
                                title={<span style={{color: '#fff'}}>{feedData.eventName}</span>}
                                style={{background: '#1F80C8', color: '#fff', padding: '5px'}}
                            >
                            </PageHeader>
                            <div style={{width: '100%'}}>
                                <img src={feedData.eventImageUrl ? feedData.eventImageUrl : 'https://qph.fs.quoracdn.net/main-qimg-6f0f383fdcb93eb05d3c87670fcb6cef'} width="100%" alt='Feed' />
                            </div>
                            <PageHeader
                                title={<span style={{color: '#fff'}}>{new Date(feedData.eventDate).toDateString().toString()}</span>}
                                extra={[
                                // <Button key="1">link1</Button>,
                                // <Button key="2">link2</Button>,
                                ]}
                                style={{background: '#1F80C8', color: '#fff', padding: '5px'}}
                            >
                                <p style={{color: '#fff'}}>Venue: {feedData.eventVenue}</p>
                            </PageHeader>
                            <p>Posted by: {feedData.feedPoster.name}</p>
                        </div>
                    </Col>
                    <Col md={24} lg={12}>
                        <div className="column-2">
                            <h3>{feedData.eventName}</h3>
                            {/* <div style={{width: '100%', position: 'relative'}}>
                                <div dangerouslySetInnerHTML={{__html: result}} style={{position: 'absolute'}}></div>
                            </div> */}
                            <paper>{feedData.eventDescription}</paper>
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

Feed.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    feed: state.feed,
    feedData: state.feed.feed,
    error: state.error
});

export default compose(
    connect(mapStateToProps, { getFeed }),
    withStyles(styles, { withTheme: true })
  )(Feed);