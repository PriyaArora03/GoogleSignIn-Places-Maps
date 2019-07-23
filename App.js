import React from "react";

import AppStackNavigator from "./src/Navigation/AppNavigator";
import NavigationService from "./src/NavigationService";

const TopLevelNavigator = AppStackNavigator;

export default class App extends React.Component {
  render() {
    return (
      <TopLevelNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
