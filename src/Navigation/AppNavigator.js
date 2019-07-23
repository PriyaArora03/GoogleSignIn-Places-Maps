
import LoginPage from '../components/LoginAndSignup/LoginPage'
import NearbyPlaces from '../components/Places/NearbyPlaces'
import PlaceDetail from '../components/Places/PlaceDetail'
import MapComponent from '../components/Places/MapComponent'
import { createStackNavigator } from 'react-navigation'

const AppStackNavigator = createStackNavigator({

    LoginPage: {
      screen: LoginPage,
      navigationOptions: {
        header: null
      }
    },
    NearbyPlaces:{
      screen: NearbyPlaces,
      navigationOptions: {
        header: null
      }
    },
    PlaceDetail: {
       screen: PlaceDetail,
       navigationOptions: {
         header: null
       }
    },
  MapComponent: {
    screen: MapComponent,
      navigationOptions: {
        header: null
      }
    }
    },
  {
    initialRouteName: "LoginPage"
  }
);
export default AppStackNavigator;