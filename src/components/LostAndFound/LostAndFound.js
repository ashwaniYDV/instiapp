import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Paper, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import LostAndFoundAll from './LostAndFoundAll';
import LostAndFoundUser from './LostAndFoundUser';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class LostAndFound extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

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
            <Switch>
                <Route exact path="/lost-n-found" component={LostAndFoundAll} />
                <Route exact path="/lost-n-found/user" component={LostAndFoundUser} />
          </Switch>
        </div>
    );
  }
}

LostAndFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LostAndFound);