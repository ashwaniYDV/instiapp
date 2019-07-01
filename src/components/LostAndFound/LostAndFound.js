import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Paper, Tabs, Tab, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import LostAndFoundAll from './LostAndFoundAll';
import LostAndFoundUser from './LostAndFoundUser';
import LoginRequired from '../LoginRequired/LoginRequired';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class LostAndFound extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    let title = this.props.history.location.pathname;
    if(title==='/lost-n-found') {
      this.setState({
        value: 0
      })
    } else if(title==='/lost-n-found/user') {
      this.setState({
        value: 1
      })
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    if(this.props.isAuthenticated) {
      return (
        <div>
            <Paper className={classes.root}>
                <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                >
                <Tab label="All" component={Link} to='/lost-n-found' />
                <Tab label="My" component={Link} to='/lost-n-found/user' />
                </Tabs>
            </Paper>
            <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
              <Button variant="contained" color="secondary" className={classes.button} component={Link} to='/lost-n-found/post' >
                Post a Lost-n-found
              </Button>
            </div>
            <Switch>
                <Route exact path="/lost-n-found" component={LostAndFoundAll} />
                <Route exact path="/lost-n-found/user" component={LostAndFoundUser} />
          </Switch>
        </div>
      );
    } else {
      return (
        <LoginRequired/>
      )
    } 
  }
}

LostAndFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  lostnfound: state.lostnfound,
  lostnfounds: state.lostnfound.lostnfounds,
  error: state.error
});

export default compose(
  connect(mapStateToProps, {}),
  withStyles(styles)
)(LostAndFound);