import React from "react";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Loader from "../../ActivityIndicator";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert
} from "react-native";

import { NavBar } from "../../Reusable/NavBar";

class DataListItem extends React.Component {
     
    render() {
        console.log("Android render called")
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.listCell}>
              <Text style={styles.item}>{this.props.item.name}</Text>
              <View style={{ height: 0.3, backgroundColor: "grey", width: "100%" }}></View>
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
      errorMessage: null,
      animating: false
    };

    this.backButtonClick = this.backButtonClick.bind(this);
  }
  componentDidMount() {
    this._getLocationAsync();
  }
  startActivityIndicator() {
    this.setState({ animating: true });
  }

  closeActivityIndicator() {
    this.setState({ animating: false });
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
  exit = async () => {
    
  }

  _getLocationAsync = async () => {
    this.startActivityIndicator();
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
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
        Alert.alert(
          "Sorry",
          "There are some issues in fetching nearby places"
          [{
            text: "OK",
            onPress: () => console.log("OK Pressed")
          }],
          { cancelable: false }
        );
      });

  }


  backButtonClick() {
    console.log("BackBtnClick");
    this.props.navigation.goBack(null);
  }
  
  
  getPlacesAsync(lat, long) {
    this.startActivityIndicator()
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "" + "&radius=9500&key=AIzaSyDspIHtcMLwDeGYO6BzRs1UKGoxljl_LHA";
    console.log(url);
    return fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.closeActivityIndicator();
        console.log(responseJson);
        return responseJson
        
      })
      .catch(error => {
        console.error(error);
        this.closeActivityIndicator();
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
        {this.state.animating && <Loader animating={this.state.animating} />}
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
            flexDirection: "column",
            width: "90%",
            height: 60,
            marginBottom: 25,
            marginHorizontal: "5%"
        },
        item: {
            padding: 2,
            fontSize: 18,
            height: 60,
        }
    });
export default NearbyPlaces;
