import React, { Component } from 'react';

import MapContainer from './MapContainer';

class Map extends Component {
    render() {
        return (
            <div style={{position: 'relative', width: '100%', height: 'calc(100vh - 64px)'}}>
                <MapContainer />
            </div>
        )
    }
}

export default Map;