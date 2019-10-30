import React from 'react';
import { connect } from 'react-redux'
import {
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  View,
  ActivityIndicator,
  Alert
} from 'react-native';
import Moment from 'moment';
import jwt_decode from 'jwt-decode';

import { ListItem, Button, Icon } from 'react-native-elements'

import SelectProjectScreen from './SelectProjectScreen';
import { createStackNavigator } from 'react-navigation';
import store from '../js/store';
import { uploadInspection } from '../api/eagleAPI';
import * as Action from '../js/actionTypes';
import { AUTH_SIGNED_IN } from '../js/constants';
import { UPDATE_OFFLINE_SWITCH } from '../js/actionTypes';

// Add Inspections Screen

const EditInspectionStack = createStackNavigator({
  selectProject: SelectProjectScreen
});

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text>Inspections</Text>
      </View>
    );
  }
}

class InspectionDetailsScreen extends React.Component {

  // static navigationOptions = {
  //   header: null
  // };
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: 'Inspection Elements',
      headerRight: (
        <Button
          title="Set Up"
          type="clear"
          onPress={() => navigation.navigate('SetUpInspectionScreen', { inspectionId: params.inspectionId })}
        />
      ),
    }
  };

  constructor(props) {
    super(props);

    this.handleStoreStateChange = this.handleStoreStateChange.bind(this);

    this.state = {
      name: '',
      project: null,
      startDate: null,
      endDate: null,
      loading: false,
      unsub: store.subscribe(this.handleStoreStateChange),
      params: props.navigation.state.params
    }
  }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  addNewElement() {
    this.props.navigation.navigate('ElementScreen', { ...this.state.params });
  }

  goToElement(index) {
    this.props.navigation.navigate('EditElementScreen', { index: index, ...this.state.params });
  }

  componentDidMount() {
    let idx = this.getIndex(this.state.params.inspectionId, this.props.inspections, 'inspectionId');
    if (idx === -1) {
      store.dispatch({
        type: Action.CURRENT_INSPECTION,
        currentInspection: {
          inspectionId: this.state.params.inspectionId,
          elements: [],
          status: 'Pending'
        }
      });
    } else {
      store.dispatch({ type: Action.CURRENT_INSPECTION, currentInspection: this.props.inspections[idx] });
    }

    this.props.navigation.setParams({ promptBeforeNavigating: this.promptBeforeNavigating });
    this.props.navigation.setParams({ submitInspection: this.submitInspection });
    this.props.navigation.setParams({ self: this });
  }

  componentWillUnmount() {
    this.state.unsub();
  }

  handleStoreStateChange() {
    let storingValue = JSON.stringify(store.getState())
    AsyncStorage.setItem('completeStore', storingValue);
    this.setState(this.props.currentInspection);
  }

  async submitInspection(self) {
    if (this.props.authState !== AUTH_SIGNED_IN || this.props.isOffline) {
      // Alert to login first.
      Alert.alert(
        //title
        'Error',
        //body
        'You must be logged in to submit an inspection.',
        [
          { text: 'Log In', onPress: () => this.props.dispatch({ type: Action.FORCE_LOGIN, forceLogin: true }) },
          {
            text: 'Stay Offline', style: 'cancel', onPress: () => {
              this.props.dispatch({ type: UPDATE_OFFLINE_SWITCH, isOffline: true });
              this.props.dispatch({ type: UPDATE_CURRENT_USER, user: null });
            }
          },
        ],
        { cancelable: false }
      );
    } else {
      // Check if the token is expired.
      let exp = jwt_decode(self.props.currentUser.jwtToken).exp;
      if (Date.now() >= exp * 1000) {
        Alert.alert(
          //title
          'Error',
          //body
          'Your session has expired.',
          [
            { text: 'Log In', onPress: () => this.props.dispatch({ type: Action.FORCE_LOGIN, forceLogin: true }) },
            {
              text: 'Stay Offline', style: 'cancel', onPress: () => {
                this.setState({ loading: false });
                this.props.dispatch({ type: UPDATE_OFFLINE_SWITCH, isOffline: true });
                this.props.dispatch({ type: UPDATE_CURRENT_USER, user: null });
                return null;
              }
            },
          ],
          { cancelable: false }
        );
      } else {
        this.setState({ loading: true });
        try {
          let resp = await uploadInspection(self.props.currentUser, self.props.currentInspection);
          if (resp && resp.status === 'Submitted') {
            self.props.currentInspection.status = 'Submitted';
            self.saveInspection(self.props.currentInspection);
            self.props.navigation.navigate('Inspections');
          } else {
            throw 'Response is null';
          }
        } catch (error) {
          console.log(error);
          Alert.alert('There was an issue with submitting your inspection.');
        }
        this.setState({ loading: false });
      }
    }
  }

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

  render() {
    if (this.props.currentInspection === undefined
      || !this.props.currentInspection.elements) {
      return null;
    } else if (this.state.loading) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView style={styles.container}>
            <View>
              {
                this.props.currentInspection.elements.length === 0 &&
                <Text style={{ marginTop: 10, marginBottom: 2 }}>You have not added any elements yet.</Text>
              }
              {
                this.props.currentInspection.elements && this.props.currentInspection.elements.map((element, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    leftAvatar={{
                      title: '' + (element.items && element.items.length) || '0',
                      // source: { uri: element.avatar_url },
                      showEditButton: true,
                    }}
                    rightIcon={{ name: 'chevron-right', style: { color: 'white' } }}
                    title={element.title}
                    onPress={() => { this.goToElement(i) }}
                    subtitle={Moment(element.timestamp).format('MMMM DD, YYYY HH:mm:ss')}
                    subtitleStyle={{ color: '#003366' }}
                  />
                ))
              }
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button
              title=" Submit Inspection"
              icon={
                <Icon
                  name="cloud-upload"
                  type='material'
                  color='white'
                />
              }
              onPress={() => this.submitInspection(this)}
            />
            <Button
              title=" Add Element"
              icon={
                <Icon
                  name="add"
                  type='material'
                  color='white'
                />
              }
              onPress={() => this.addNewElement()}
            />
          </View>
        </View>
      );
    }
  }
}

function mapStoreStateToProps(storeState) {
  return {
    currentUser: storeState.auth.currentUser,
    projects: storeState.models.projects,
    currentInspection: storeState.models.currentInspection,
    inspections: storeState.models.inspections,
    requestError: storeState.ui.requests.error,
    authState: storeState.auth.authState
  };
}
export default connect(mapStoreStateToProps)(InspectionDetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  dateContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    width: 85,
    height: 85,
    margin: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  footer: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    alignContent: 'center',
  }
});
