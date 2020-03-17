import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { connect } from 'react-redux'
// Isn't used but will keep in this file
import { mainTabNavigatorStyles as styles } from '../styles'
import TabBarIcon from '../components/TabBarIcon'
import SubmittedScreen from '../screens/SubmittedScreen'
import InspectionsScreen from '../screens/InspectionsScreen'
import InspectionDetailsScreen from '../screens/InspectionDetailsScreen'
import SettingsScreen from '../screens/SettingsScreen'
import CameraScreen from '../screens/CameraScreen'
import VideoScreen from '../screens/VideoScreen'
import SelectProjectScreen from '../screens/SelectProjectScreen'
import RecorderScreen from '../screens/RecorderScreen'
import ROInspectionScreen from '../screens/ROInspectionScreen'
import ElementScreen from '../screens/ElementScreen'
import SetUpInspectionScreen from '../screens/SetUpInspectionScreen'
import EditElementScreen from '../screens/EditElementScreen'
import PreviewElementScreen from '../screens/PreviewElementScreen'
import AddCaptionScreen from '../screens/AddCaptionScreen'

const HomeStack = createStackNavigator({
  Home: SubmittedScreen,
  ROInspection: ROInspectionScreen,
  RecorderScreen: RecorderScreen,
  EditElementScreen: EditElementScreen,
  CameraScreen: CameraScreen,
  VideoScreen: VideoScreen,
  ElementScreen: ElementScreen,
  PreviewElementScreen: PreviewElementScreen
})

HomeStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#fcba18',
    inactiveTintColor: '#fcba18',
    inactiveBackgroundColor: '#003366'
  },
  tabBarLabel: 'Submitted',
  tabBarIcon: ({ focused }) => {
    return (<TabBarIcon focused={focused} name={Platform.OS === 'ios'
      ? 'home'
      : 'home'} />)
  }
}

// Pending Inspections
const InspectionsStack = createStackNavigator({
  Inspections: InspectionsScreen,
  InspectionDetailsScreen: InspectionDetailsScreen,
  SetUpInspectionScreen: SetUpInspectionScreen,
  EditElementScreen: EditElementScreen,
  ROInspection: ROInspectionScreen,
  SelectProject: SelectProjectScreen,
  CameraScreen: CameraScreen,
  VideoScreen: VideoScreen,
  RecorderScreen: RecorderScreen,
  ElementScreen: ElementScreen,
  PreviewElementScreen: PreviewElementScreen,
  AddCaptionScreen: AddCaptionScreen
})

InspectionsStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#fcba18',
    inactiveTintColor: '#fcba18',
    inactiveBackgroundColor: '#003366'
  },
  tabBarLabel: 'Pending',
  tabBarIcon: ({ focused }) => {
    return (<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'book' : 'book'} />)
  }
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})

SettingsStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#fcba18',
    inactiveTintColor: '#fcba18',
    inactiveBackgroundColor: '#003366'
  },
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => {
    return (<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'settings' : 'settings'} />)
  }
}

const nav = createBottomTabNavigator({
  InspectionsStack,
  HomeStack,
  SettingsStack
})

class MainApp extends React.Component {
  async componentDidMount() {
  }
}

const mapStateToProps = storeState => {
  return {
    currentUser: storeState.auth.currentUser
  }
}

export default connect(mapStateToProps)(nav)
