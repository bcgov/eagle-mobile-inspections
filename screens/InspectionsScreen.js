import React from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, Button, Alert, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { getLocalInspections } from '../js/api';
import * as uuid from 'react-native-uuid';
import store from '../js/store';
import * as Action from '../js/actionTypes';
import { AUTH_SIGNED_OUT } from '../js/constants';
import Moment from 'moment';

import { uploadInspection } from '../api/eagleAPI';
// Pending Inspections Screen

class LogoTitle extends React.Component {
  render() {
    return (
      <ImageBackground source={require("../assets/images/bcgov-header-vert-SM.png")} style={{ width: 50, height: 50 }}>
      </ImageBackground>
    );
  }
}

class InspectionsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.addNewInspection = this.addNewInspection.bind(this);
    // this.submitAll = this.submitAll.bind(this);
    this.goToInspection = this.goToInspection.bind(this);

    this.state = {
      loading: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: "Inspections", //<LogoTitle />,
      headerRight: (
        <Button
          title="Add Inspection"
          onPress={() => params.addNewInspection()}
        />
      ),
      // headerLeft: (
      //   <Button
      //     title="Submit All"
      //     onPress={
      //       () => params.submitAll()
      //     }
      //   />
      // ),
    }
  };

  // submitAll = async () => {
  //   // Check authed state first
  //   if (this.props.authState === AUTH_SIGNED_OUT) {
  //     // Login first.

  //     // Alert to login first.
  //     Alert.alert(
  //       //title
  //       'Warning',
  //       //body
  //       'You are not logged in, logon now?',
  //       [
  //         { text: 'Yes', onPress: () => this.props.dispatch({ type: Action.FORCE_LOGIN, forceLogin: true }) },
  //         {
  //           text: 'Cancel', style: 'cancel', onPress: () => {
  //             console.log('No Pressed');
  //           }
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   } else {
  //     this.setState({ loading: true });
  //     let allInspections = [...this.props.inspections];

  //     let pending = [];
  //     await Promise.all(allInspections.map(async i => {
  //       if (i.status === 'Pending') {
  //         pending.push(i);
  //       }
  //     }));
  //     console.log("Pending:", pending);
  //     for (let i of pending) {
  //       console.log("iiiiiii:",i)
  //       let resp = await uploadInspection(this.props.currentUser, i);
  //       console.log("resp:",resp)
  //       if (resp && resp.status === 'Submitted') {
  //         i.status = 'Submitted';
  //         console.log("storing new state of inspection")
  //         this.saveInspection(i);
  //       } else {
  //         Alert.alert(
  //           //title
  //           'Error',
  //           //body
  //           'There was an issue with submitting your inspection.',
  //           [
  //             { text: "OK", onPress: () => { } }
  //           ],
  //           { cancelable: false }
  //         );
  //       }
  //       this.setState({ loading: false });
  //     }
  //   }
  // }

  saveInspection(item) {
    let inspections = [];
    if (this.props.inspections && this.props.inspections.length > 0) {
      inspections = [...this.props.inspections];
      let idx = this.getIndex(item.inspectionId, inspections, 'inspectionId');

      if (idx !== -1) {
        inspections[idx] = item;
      }
      console.log("Fixed old");
    } else {
      console.log("Pushing new")
      inspections.push(item);
    }
    store.dispatch({ type: Action.UPDATE_INSPECTIONS, inspections: inspections });
  }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  addNewInspection() {
    // TODO Nav to the add inspection component.
    const { navigate } = this.props.navigation;

    let emailDisplay = 'offline mode';
    try {
      emailDisplay = this.props.currentUser.decoded.email;
    } catch (e) {
      // Offline
      console.log('e:', e);
    }

    // Create a new inspection and put it into currentInspection datastore.
    let unique = uuid.v4();
    store.dispatch({
      type: Action.CURRENT_INSPECTION,
      currentInspection: {
        inspectionId: unique,
        elements: [],
        status: 'Pending',
        email: emailDisplay
      }
    });
    // Setup the default array
    navigate('SetUpInspectionScreen', { inspectionId: unique })
  }

  componentDidMount() {
    // Ask
    navigator.geolocation.requestAuthorization();

    this.props.navigation.setParams({ addNewInspection: this.addNewInspection });
    // this.props.navigation.setParams({ submitAll: this.submitAll });
    this.props.navigation.setParams({ self: this });
    this.fetch();
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  fetch = async () => {
    console.log("fetching...");
    this.setState({ loading: true });
    // This gets all the non-submitted inspections
    await getLocalInspections();
    this.setState({ loading: false });
  }

  goToInspection(inspection) {
    this.props.navigation.navigate('InspectionDetailsScreen', { inspectionId: inspection.inspectionId });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <ScrollView style={styles.container}>
              <View>
                {
                  this.props.inspections && this.props.inspections.map((l, i) => (
                    l.status === 'Pending' && (l.customProjectName) &&
                    <ListItem
                      key={i}
                      bottomDivider
                      leftAvatar={{
                        title: l.elements.length.toString(),
                        source: { uri: l.avatar_url },
                        showEditButton: true,
                      }}
                      rightIcon={{ name: 'chevron-right', style: { color: 'white' } }}
                      title={l.name}
                      onPress={() => { this.goToInspection(l) }}
                      subtitle={l.customProjectName}
                      rightSubtitle={Moment(l.startDate).format('YYYY-MM-DD') + ' ' + Moment(l.endDate).format('YYYY-MM-DD')}
                      subtitleStyle={{ color: 'orange' }}
                    />))
                  }
                  {
                    this.props.inspections && this.props.inspections.map((l, i) => (
                      l.status === 'Pending' && (!l.customProjectName) &&
                      <ListItem
                        key={i}
                        bottomDivider
                        leftAvatar={{
                          title: l.elements.length.toString(),
                          source: { uri: l.avatar_url },
                          showEditButton: true,
                        }}
                        rightIcon={{ name: 'chevron-right', style: { color: 'white' } }}
                        title={l.name}
                        onPress={() => { this.goToInspection(l) }}
                        subtitle={l.project.name}
                        rightSubtitle={Moment(l.startDate).format('YYYY-MM-DD') + ' ' + Moment(l.endDate).format('YYYY-MM-DD')}
                        subtitleStyle={{ color: 'orange' }}
                      />))
                }
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

function mapStoreStateToProps(storeState) {
  return {
    currentUser: storeState.auth.currentUser,
    inspections: storeState.models.inspections,
    requestError: storeState.ui.requests.error,
    authState: storeState.auth.authState
  };
}
export default connect(mapStoreStateToProps)(InspectionsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
