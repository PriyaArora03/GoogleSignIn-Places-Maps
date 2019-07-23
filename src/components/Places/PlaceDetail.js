import React from "react";

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import { NavBar } from "../../Reusable/NavBar";


class PlaceDetail extends React.Component {
  constructor(props) {
    super(props);
    
    this._mapViewButtonClick = this._mapViewButtonClick.bind(this);
    this.backButtonClick = this.backButtonClick.bind(this);
  }
 
  _mapViewButtonClick() {
    const { navigation } = this.props;
    const place = navigation.getParam("placesInfo");
    const currentLocation = navigation.getParam("currentLoc");
    this.props.navigation.navigate("MapComponent", {
      placesInfo: place,
      currentLoc: currentLocation,
      placeLoc: {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng
      }
    });
    console.log("MapViewClicked" + place.geometry.location.lat, place.geometry.location.lng )
  }
  backButtonClick() {
    console.log("BackBtnClick");
    this.props.navigation.goBack(null);
  }

  render() {
    const { navigation } = this.props;
    const place = navigation.getParam("placesInfo");
    const placeName = place.name;
    const placeType = place.types[1];
    const placeRating = place.rating;
    return (
      <View style={styles.mainContainer}>
        <NavBar
          showBackBtn="false"
          onBackPress={this.backButtonClick}
          title={"Place Details"}
        />
        <View style={styles.textContainer}>
          <Text style={styles.detailText}>Name - {placeName}</Text>
          <Text style={styles.detailText}>Type - {placeType}</Text>
          <Text style={styles.detailText}>Rating - {placeRating}</Text>
        </View>
        <TouchableOpacity
          onPress={this._mapViewButtonClick}
          style={styles.mapButton}
        >
          <Text style={styles.mapButtonTextStyle}>Directions</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
    },
    title: {
            fontSize: 18,
        },
    mapButton: {
        height: 40,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
        alignSelf: 'center'
    },
    mapButtonTextStyle: {
        fontSize: 18,
        fontWeight: "normal",
        color: "black",
        textAlign: "center"
    },
    textContainer: {
         flex: .6,
         justifyContent: 'center',
         alignItems: 'flex-start',
         paddingLeft: 20,
        },

    detailText: {
       width: "80%",
       marginBottom: 40,
       color: "black",
       fontSize: 20,
       justifyContent: "center",
       alignItems: 'center'
    },
    headerContainer: {
            height: 70,
            marginTop: 0,
            width: "100%",
            backgroundColor: "lightblue",
            justifyContent: "center",
            alignItems: "center"
        }
});

export default PlaceDetail;
