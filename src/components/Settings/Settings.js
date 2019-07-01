import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import SelectMess from './SelectMess';
import UpdateMess from './UpdateMess';
import LoginRequired from '../LoginRequired/LoginRequired';

class Settings extends React.Component {

    render() {
        if(this.props.isAuthenticated){
            return (
                <div>
                    <SelectMess/>
                    <UpdateMess/>
                </div>    
            );
        } else {
            return (
                <LoginRequired/>
            )
        }
        
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default compose(
    connect(mapStateToProps, {}),
  )(Settings);