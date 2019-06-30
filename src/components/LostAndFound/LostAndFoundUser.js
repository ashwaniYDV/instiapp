import React, {Component} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardHeader, CardContent, IconButton, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Fab, Icon } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Spin, Alert, Tag, Row, Col } from 'antd';
import 'antd/dist/antd.css';

import {getUserLostnfounds, deleteLostnfound} from '../../redux/actions/lostnfoundActions';

const styles = theme => ({
  card: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class LostAndFoundUser extends Component {

    state = {
        msg: null,
        expanded: false
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          if (error.id === "ALL_LOSTANDFOUNDS__FAIL") {
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
        this.props.getUserLostnfounds();
    }

    handleExpandClick = () => {
      this.setState({
        expanded: !this.state.expanded
      });
    };

    renderSwitch = (param) => {
      switch(param) {
        case 1:
          return <Tag color="magenta">Lost</Tag>;
        case 2:
          return <Tag color="blue">Found</Tag>;
        case 3:
            return <Tag color="green">Recovered</Tag>;
        default:
          return;
      }
    }
    
    handleDelete = async (id) => {
        await this.props.deleteLostnfound(id);
        this.props.getUserLostnfounds();
    }

    handleEdit = (id) => {
        console.log(id)
    }

    render () {
      const { classes, userlostnfounds } = this.props;
      const { msg } = this.state;
      const userlostnfoundList = userlostnfounds && !this.props.lostnfound.lostnfoundsLoading ? (userlostnfounds.map((lostnfound) => {
			return (
        <div style={{padding: '20px', display: 'flex', justifyContent: 'center'}} key={lostnfound._id}>
          <Card className={classes.card}>
            <CardHeader
              style={{background: '#eee'}}
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton>
                    {this.renderSwitch(lostnfound.lostStatus)}
                </IconButton>
              }
              title={lostnfound.name}
              subheader="September 14, 2016"
            />
            {/* <CardMedia
              className={classes.media}
              image="/static/images/cards/paella.jpg"
              title="Paella dish"
            /> */}
            <CardContent>
              <Typography variant="h6" gutterTop>Name:</Typography>
              {lostnfound.name}
              <Typography variant="h6" gutterTop>Date:</Typography>
              {lostnfound.date}
              <Typography variant="h6" gutterTop>Place:</Typography>
              {lostnfound.place}
              <Typography variant="h6" gutterTop>Time:</Typography>
              {lostnfound.time}
              <Typography variant="h6" gutterTop>Address:</Typography>
              {lostnfound.address}
              <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <Fab color="primary" variant="extended" size="small" className={classes.fab} onClick={()=>{this.handleEdit(lostnfound._id)}} >
                    <EditIcon className={classes.extendedIcon} />
                    Edit
                </Fab>
                <Fab color="secondary" variant="extended" size="small" className={classes.fab} onClick={()=>{this.handleDelete(lostnfound._id)}} >
                    <DeleteIcon className={classes.extendedIcon} />
                    Delete
                </Fab>
              </div>
            </CardContent>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>More Info</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Row>
                  <Col xs={12}>
                    <Tag color="#2db7f5">Description</Tag>
                    <Typography style={{marginBottom: '10px'}}>
                      {lostnfound.description}
                    </Typography>
                  </Col>
                  <Col xs={12}>
                  <Tag color="#2db7f5">Posted by-</Tag>
                    <Typography style={{marginBottom: '10px'}}>
                      {this.props.user.name}
                      <br/>
                      {this.props.user.instituteId}
                    </Typography>
                  </Col>
                </Row>
              </ExpansionPanelDetails>
            </ExpansionPanel>
 
          </Card>
        </div>
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
                {userlostnfoundList.length ? userlostnfoundList : <Alert message="No lostnfounds found!" type='warning' />}
            </div>
        );
    }
}

LostAndFoundUser.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user,
    lostnfound: state.lostnfound,
    userlostnfounds: state.lostnfound.userlostnfounds,
    error: state.error
});

export default compose(
    connect(mapStateToProps, { getUserLostnfounds, deleteLostnfound }),
    withStyles(styles, { withTheme: true })
  )(LostAndFoundUser);