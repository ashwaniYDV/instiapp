import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Dashboard extends Component {
  state={
    user: this.props.user
  }
  render() {
    console.log(this.state.user);
    return (
      <div className="container">
        {this.state.user ? <p>{this.state.user.name}</p> : <p>Loading..</p> }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default connect( mapStateToProps, actions )(Dashboard);