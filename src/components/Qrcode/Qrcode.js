import React, { Component } from 'react'
import { connect } from 'react-redux';

class Qrcode extends Component {

    state={
        src: ''
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
        
        return (
          isAuthenticated ? (
            <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
                {this.state.src!='' ? (
                    <img src={this.state.src} />
                ): (
                    <div>loading...</div>
                )
                }
                
            </div>
          ): 
          <h3 className="text-center text-danger">Please login again!</h3>
        );
      }
}

function mapStateToProps (state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user
    }
  }
  
  export default connect( mapStateToProps, {} )(Qrcode);