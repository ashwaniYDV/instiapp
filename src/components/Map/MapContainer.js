import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
class MapContainer extends Component {
  render() {
    return (
      <div>
        <Map 
          google={this.props.google} zoom={14}
          style={{width: '100%', height: '100%'}}
          initialCenter={{
            lat: 25.5357,
            lng: 84.8512
          }}
        >
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
   
           <InfoWindow onClose={this.onInfoWindowClose}>
               <div>
                 {/* <h1>{this.state.selectedPlace.name}</h1> */}
               </div>
           </InfoWindow>
        </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCgAthTmkrUj_MGOl2BwIyaGh7BrN5C3ro')
})(MapContainer)