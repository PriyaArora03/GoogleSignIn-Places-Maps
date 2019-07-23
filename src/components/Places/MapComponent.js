import React from "react";
import { Constants, MapView, Location, Permissions} from 'expo';

import {StyleSheet, View , Text} from "react-native";

let markers = [];

class MapComponent extends React.Component {

    
    constructor() {
        
        super();
        this.state = {
            markers: [{
                id:1,
                title: 'hello',
                coords: {
                    latitude: 12.9716,
                    longitude: 77.5946
                },
            },
            {
                id:2,
                title: 'hello',
                coords: {
                    latitude: 11.9716,
                    longitude: 76.5946
                },
            }],
                mapRegion: { latitude: 3.148561, longitude: 101.652778, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
                locationResult: null,
               
                location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
            };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const currentLocation = navigation.getParam("currentLoc");
        const placeLoc = navigation.getParam("placeLoc");
        console.log("PlaceLocation"+ placeLoc)
        const currentMarker = {
            id: 1,
            title: 'My Location',
            coords: currentLocation
        }
        const placeMarker = {
            id: 2,
            title: 'Place',
            coords: placeLoc
        }
       
        markers.push(currentMarker);
        markers.push(placeMarker);
        this.setState({ markers: markers })
        console.log("Marker:", currentMarker, placeMarker);
       
    }

    _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };

    render() {
        const { navigation } = this.props;
        const currentLocation = navigation.getParam("currentLoc");
        return ( 
            <MapView style={styles.map}
                region={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude, latitudeDelta: 0.1122, longitudeDelta: 0.1121 }}
                onRegionChange={this._handleMapRegionChange}
            >
                {this.state.markers.map(marker => (
                    <MapView.Marker
                        key={marker.id}
                        coordinate={marker.coords}
                        title={marker.title}
        
                    />
                ))}
            </MapView>

        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
});

export default MapComponent;
