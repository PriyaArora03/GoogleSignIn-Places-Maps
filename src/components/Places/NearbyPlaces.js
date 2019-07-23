import React from "react";
import {  Location, Permissions } from 'expo';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";

import { NavBar } from "../../Reusable/NavBar";

// let currentLocationalat = 0
// let currentLocationlong = 0

class DataListItem extends React.Component {
     
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.listCell}>
                <View style={styles.textsView}>
                    <Text style={styles.item}>{this.props.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

let latitude = 0;
let longitude = 0;

class NearbyPlaces extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      placesInfo: [],
    };

    this.backButtonClick = this.backButtonClick.bind(this);
  }
  componentDidMount() {
    this._getLocationAsync();
  }
   
  _handleRowClick = item => {
    const place = item;
    const currentLocationCoords = {
      latitude: latitude,
      longitude: longitude
    }
    console.log(currentLocationCoords);

    this.props.navigation.navigate("PlaceDetail", {
      placesInfo: place,
      currentLoc: currentLocationCoords
    });
  };

  _getLocationAsync = async () => {
    console.log(" get location method called")
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // this.setState({
      //   locationResult: 'Permission to access location was denied',
      //   location
      // });
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log("Current location:", location) 

    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  

    this.getPlacesAsync(latitude,longitude)
      .then(result => {
        this.setState({
          placesInfo: result.results
        });
      })
      .catch(err => {
        console.log("Error:" - err);
      });

  }


  backButtonClick() {
    console.log("BackBtnClick");
    this.props.navigation.goBack(null);
  }
  
  
  getPlacesAsync(lat, long) {

    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "" + "&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyDspIHtcMLwDeGYO6BzRs1UKGoxljl_LHA";
    return fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        return responseJson
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <NavBar showBackBtn="false" onBackPress={this.backButtonClick} title = {"Nearby Places"}/>
        <FlatList
          style={styles.listContainer}
          data={this.state.placesInfo}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <DataListItem
                onPress={() => this._handleRowClick(item)}
                item={item}
                index={index}
              />
            );
          }}
        />
      </View>
    );
  }
}

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: "white"
        },
        title: {
            fontSize: 18,
        },
        headerContainer: {
            flexDirection: 'row',
            height: 70,
            width: "100%",
            backgroundColor: "lightblue",
            justifyContent: "center",
            alignItems: "center",
        },
        listContainer: {
            flexDirection: "column",
        },
        listCell: {
            flexDirection: "row",
            width: "90%",
            height: 60,
            backgroundColor: "lightgrey",
            marginBottom: 15,
            marginHorizontal: "5%",
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
        backButtonStyle: {
            backgroundColor: "transparent",
            width: 30,
            height: 30,
            marginLeft: 20,
            marginTop: 20
        },
        backButtonImageStyle: {
            width: 30,
            height: 30,
            resizeMode: "contain"
        },
    });
export default NearbyPlaces;
