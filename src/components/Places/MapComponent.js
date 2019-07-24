import React from "react";
import { MapView} from 'expo';
import {View, StyleSheet} from "react-native";
import { NavBar } from "../../Reusable/NavBar";

let markers = [];

class MapComponent extends React.Component {

    constructor() {
        
        super();
        this.state = {
            markers: [{ }],
            };
        this.backButtonClick = this.backButtonClick.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        const currentLocation = navigation.getParam("currentLoc");
        const placeLoc = navigation.getParam("placeLoc");
        console.log(currentLocation, placeLoc)
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
    backButtonClick() {
        console.log("BackBtnClick");
        this.props.navigation.goBack(null);
    }

    render() {
        const { navigation } = this.props;
        const currentLocation = navigation.getParam("currentLoc");
        return ( 
            <View style={styles.mainContainer}>
                <NavBar
                    showBackBtn="false"
                    onBackPress={this.backButtonClick}
                    title={"Directions"}
                />
                <MapView style={{height: "100%"}}
                    region={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude, latitudeDelta: 0.1122, longitudeDelta: 0.1121 }}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            key={marker.id}
                            coordinate={marker.coords}
                            title={marker.title}
            
                        />
                    ))}
                </MapView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
});

export default MapComponent;
