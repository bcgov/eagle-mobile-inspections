import React from 'react';

import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { connect } from 'react-redux'

import TabBarIcon from '../components/TabBarIcon';
import SubmittedScreen from '../screens/SubmittedScreen';
import InspectionsScreen from '../screens/InspectionsScreen';
import InspectionDetailsScreen from '../screens/InspectionDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CameraScreen from '../screens/CameraScreen';
import VideoScreen from '../screens/VideoScreen';
import SelectProjectScreen from '../screens/SelectProjectScreen';
import RecorderScreen from '../screens/RecorderScreen';
import ROInspectionScreen from '../screens/ROInspectionScreen';
import ElementScreen from '../screens/ElementScreen';
import SetUpInspectionScreen from '../screens/SetUpInspectionScreen';
import EditElementScreen from '../screens/EditElementScreen';
import PreviewElementScreen from '../screens/PreviewElementScreen';
import AddCaptionScreen from '../screens/AddCaptionScreen';

const HomeStack = createStackNavigator({
  Home: SubmittedScreen,
  ROInspection: ROInspectionScreen,
  RecorderScreen: RecorderScreen,
  EditElementScreen: EditElementScreen,
  CameraScreen: CameraScreen,
  VideoScreen: VideoScreen,
  ElementScreen: ElementScreen,
  PreviewElementScreen: PreviewElementScreen,
});

HomeStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#fcba18',
    inactiveTintColor: '#fcba18',
    inactiveBackgroundColor: '#003366'
  },
  tabBarLabel: 'Submitted',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'home'
          : 'home'
      }
    />
  ),
};

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
  AddCaptionScreen: AddCaptionScreen,
});

InspectionsStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#fcba18',
    inactiveTintColor: '#fcba18',
    inactiveBackgroundColor: '#003366'
  },
  tabBarLabel: 'Pending',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'book' : 'book'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#fcba18',
    inactiveTintColor: '#fcba18',
    inactiveBackgroundColor: '#003366'
  },
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'settings' : 'settings'}
    />
  ),
};


const nav = createBottomTabNavigator({
  InspectionsStack,
  HomeStack,
  SettingsStack,
});

class MainApp extends React.Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
  }

  render() {

  }
}

const mapStateToProps = storeState => {
  return {
    currentUser: storeState.auth.currentUser,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  submittedScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default connect(mapStateToProps)(nav);
// export default createBottomTabNavigator({
//   HomeStack,
//   SettingsStack,
//   InspectionsStack,
// });
