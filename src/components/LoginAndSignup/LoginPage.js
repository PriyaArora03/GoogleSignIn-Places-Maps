
import React from "react";
import * as GoogleSignIn from "expo-google-sign-in";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // Initialize google signin
    this.initializeGoogleSignin();
    this._onSignInClick = this._onSignInClick.bind(this);
  }

  initializeGoogleSignin = async() => {
      try {
        await GoogleSignIn.initAsync({
          clientId:
            "221889692030-r6ttjuhj9qfolfcd1hkut7vmacv7sg63.apps.googleusercontent.com"
        });
      } catch ({ message }) {
        alert("GoogleSignIn.initAsync(): " + message);
      }
  }
  signInAsync = async() => {
      try {
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();
        if (type === "success") {
          console.log('User:', user);
        }
      } catch ({ message }) {
        alert("login: Error:" + message);
      }
  }

  _onSignInClick() {
    this.props.navigation.navigate("NearbyPlaces");
    this.signInAsync();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text>LOG IN</Text>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.loginText}>Username</Text>
            <TextInput
              underlineColorAndroid={"rgba(0,0,0,0)"}
              autoCapitalize={"none"}
              returnKeyType={"next"}
              onSubmitEditing={() => {
                this.secondTextInput.focus();
              }}
              style={styles.textInput}
              onChangeText={
                text =>
                  this.setState(state => ((state.user.username = text), state)) // placeholder={I18n.get('Username')}
              }
            />
            <Text style={styles.loginText}>Password</Text>
            <TextInput
              ref={input => {
                this.secondTextInput = input;
              }}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              secureTextEntry={true}
              style={styles.passwordTextInput}
              onChangeText={
                text =>
                  this.setState(state => ((state.user.password = text), state)) //placeholder="Password"
              }
            />
            <TouchableOpacity
              onPress={this._onSignInClick}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonTextStyle}>LogIn With Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  headerContainer: {
    height: 70,
    marginTop: 0,
    width: "100%",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    height: 40,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 15,
    backgroundColor: "lightblue"
  },
  middleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height:"70%",
    alignItems: "center",  
  },
  textInput: {
    height: 40,
    width: "90%",
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    marginBottom: "7%",
    paddingHorizontal: "5%"
  },
  passwordTextInput: {
    height: 40,
    width: "90%",
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    marginBottom: "12%",
    paddingHorizontal: "5%"
  },
  loginButtonTextStyle: {
    fontSize: 18,
    fontWeight: "normal",
    color: "black",
    textAlign: "center"
  },
  loginText: {
    fontSize: 15,
    fontWeight: "normal",
    width: 35,
    paddingLeft: 5,
    color: "#7C7B7B",
    marginBottom: 5,
    marginRight: "60%",
    textAlign: "left"
  }
});

export default LoginPage;
