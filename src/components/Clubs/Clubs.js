import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Spin, Alert, Row, Col, Icon } from 'antd';
import 'antd/dist/antd.css';

import {getAllClubs} from '../../redux/actions/clubActions';

const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
});

class Clubs extends Component {

    state = {
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          if (error.id === "ALL_CLUBS_FAIL") {
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
        this.props.getAllClubs();
    }

    render () {
        const { classes, clubs } = this.props;
        const { msg } = this.state;
        const clubList = this.props.club.clubs && !this.props.club.clubsLoading ? (clubs.map((club) => {
			return (
                <Col sm={24} lg={12} style={{padding: '20px', display: 'flex', justifyContent: 'center'}} key={club._id} >
                    <Link to={`/club/${club._id}`}>
                        <Card className={classes.card}>
                            <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                {club.name[0]}
                                </Avatar>
                            }
                            action={
                                <IconButton>
                                <MoreVertIcon />
                                </IconButton>
                            }
                            title={club.name}
                            subheader={club.bio}
                            />
                            <CardMedia
                            className={classes.media}
                            image="https://qph.fs.quoracdn.net/main-qimg-6f0f383fdcb93eb05d3c87670fcb6cef"
                            title="IIT-P Club"
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {club.description.substr(0,200)}...
                                <span style={{lineHeight:3,display:"block"}}><Link to="#">Visit Our Site</Link></span>
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <Icon  style={{padding:10, fontSize: '20px', color: 'blue'}} type="facebook" />
                                <Icon  style={{padding:10, fontSize: '20px', color: 'green'}} type="linkedin" />
                                <Icon  style={{padding:10, fontSize: '20px', color: 'pink'}} type="instagram" />
                                <Icon  style={{padding:10, fontSize: '20px', color: 'blue'}} type="twitter" />
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon />
                                    <span style={{padding:10}}>{club.followers}</span>
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Link>
                </Col>
			)
		})
		) : (
				[<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} key="spinner">
					<Spin tip="Loading..." size="large" ></Spin>
				</div>]
			)
        
        return (
            <div style={{margin: '20px'}}>
                {msg ? <Alert message={msg} type="error" /> : null}
                <Row>
                    {clubList.length ? clubList : <Alert message="No clubs found!" type='warning' />}
                </Row>
            </div>
        );
    }
}

Clubs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    club: state.club,
    clubs: state.club.clubs,
    error: state.error
});

export default compose(
    connect(mapStateToProps, { getAllClubs }),
    withStyles(styles, {withTheme: true})
  )(Clubs);