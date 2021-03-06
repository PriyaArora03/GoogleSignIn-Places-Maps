import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";


export class NavBar extends React.Component {
  render() {
    return (
      
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={this.props.onBackPress}
            >
              <Text> Back </Text> 
            </TouchableOpacity>

            {this.props.title && (
              <View
                style={{
                  width: 220,
                  flexDirection: "row",
                  backgroundColor: "transparent"
                }}
              >
                <Text style={styles.headerText}>{this.props.title}</Text>
              </View>
            )}
          </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "lightblue"
  },

  headerText: {
    color: "black",
    fontSize: 18
  },

  backBtn: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 5
  }
});
