import React, { Component } from 'react'
import { connect } from 'react-redux';

import LoginRequired from '../LoginRequired/LoginRequired';
import CancelMeal from './CancelMeal';

class Qrcode extends Component {

    state={
        src: null
    }

    componentDidMount = async () => {
        if(this.props.isAuthenticated) {
            let src =  `https://api.qrserver.com/v1/create-qr-code/?data=${this.props.user._id}&amp;size=100x100`
            this.setState({
                src: src
            })
        }
    }

    render() {
        const { isAuthenticated } = this.props;
        
          if(isAuthenticated){
              return (
                  <div>
                    <div className="container" style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                        {this.state.src!==null ? (
                            <img src={this.state.src} alt='QR Code' />
                        ): (
                            <p>Loading...</p>
                        )
                        } 
                        </div>
                        <CancelMeal/>
                    </div>
              )
          } else {
              return (
                <LoginRequired/>
              )
          }
      }
}

function mapStateToProps (state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user
    }
  }
  
  export default connect( mapStateToProps, {} )(Qrcode);