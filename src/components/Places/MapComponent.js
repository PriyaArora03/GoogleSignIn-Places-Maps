import React from "react";
import { MapView, Location, Permissions} from 'expo';

import {StyleSheet} from "react-native";


class MapComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            markers: [{
                id:1,
                title: 'my current location',
                coordinate : {
                    latitude: 3.148561, 
                    longitude: 101.652778
                }
            },
            {
                id:2,
                title: 'hello',
                coordinate: {
                    latitude: 3.149771,
                    longitude: 101.655449
                },
            }],
                region: { latitude: 3.148561, longitude: 101.652778, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
                locationResult: null,
                location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
            };
    }
    componentDidMount() {
        this._getLocationAsync();
    
    }

    _handleMapRegionChange = region => {
        this.setState({ region });
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
                location
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location), location, });
    };

    render() {
        return (
           

            <MapView style={styles.map}
                region={this.state.region}
                onRegionChange={this._handleMapRegionChange}
            >
                {this.state.markers.map(marker => (
                    <MapView.Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
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
