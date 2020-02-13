import React from 'react'
import { connect } from 'react-redux'
import {
  Alert,
  ScrollView,
  Text,
  AsyncStorage,
  View
} from 'react-native'
import Moment from 'moment'
import { ListItem, Button } from 'react-native-elements'
import { ROInspectionScreenStyles as styles } from '../styles/baseStyleSheets'
import SelectProjectScreen from './SelectProjectScreen'
import { createStackNavigator } from 'react-navigation'
import store from '../js/store'
import * as Action from '../js/actionTypes'

const EditInspectionStack = createStackNavigator({
  selectProject: SelectProjectScreen
})

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text>Inspections</Text>
      </View>
    )
  }
}

// RO Inspections Screen
class ROInspectionScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: 'Inspection',
      headerRight: (
        <Button
          title="Remove"
          type="clear"
          onPress={() =>
            Alert.alert(
              // title
              'Warning',
              // body
              'Are you sure you want to remove this inspection?',
              [
                { text: 'Yes', onPress: () => params.removeInspection(params.self) },
                { text: 'Cancel', onPress: () => console.log('No Pressed'), style: 'cancel' }
              ],
              { cancelable: false }
            )
          }
        />
      )
    }
  };

  constructor(props) {
    super(props)

    this.handleStoreStateChange = this.handleStoreStateChange.bind(this)
    this.showElement = this.showElement.bind(this)

    this.state = {
      name: '',
      project: null,
      startDate: null,
      endDate: null,
      unsub: store.subscribe(this.handleStoreStateChange),
      params: props.navigation.state.params
    }
  }

  goToElement(index) {
    this.props.navigation.navigate('EditElementScreen', { index: index, readonly: true, ...this.state.params })
  }

  removeInspection(self) {
    let inspections = []
    if (self.props.inspections && self.props.inspections.length > 0) {
      inspections = [...self.props.inspections]
      const idx = self.getIndex(self.props.currentInspection.inspectionId, inspections, 'inspectionId')

      if (idx !== -1) {
        inspections.splice([idx], 1)
      }
    }
    store.dispatch({ type: Action.UPDATE_INSPECTIONS, inspections: inspections })
    const { navigate } = self.props.navigation
    navigate('Home')
  }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i
      }
    }
    return -1 // to handle the case where the value doesn't exist
  }

  componentDidMount() {
    // Setup the params for the header items to call back into this class.
    // console.log('Params:', this.state.params);
    // console.log("I:", this.props.inspections);

    const idx = this.getIndex(this.state.params.inspectionId, this.props.inspections, 'inspectionId')
    if (idx === -1) {
      store.dispatch({
        type: Action.CURRENT_INSPECTION,
        currentInspection: {
          inspectionId: this.state.params.inspectionId,
          elements: [],
          status: 'Pending'
        }
      })
    } else {
      store.dispatch({ type: Action.CURRENT_INSPECTION, currentInspection: this.props.inspections[idx] })
    }
    this.props.navigation.setParams({ removeInspection: this.removeInspection })
    this.props.navigation.setParams({ self: this })
  }

  componentWillUnmount() {
    // // Remove the listener when you are done
    this.state.unsub()
  }

  handleStoreStateChange() {
    // console.log('handle store state change curr', this.props.currentInspection);
    // console.log('handle store state change insps', this.props.inspections);
    const storingValue = JSON.stringify(store.getState())
    AsyncStorage.setItem('completeStore', storingValue)
    this.setState(this.props.currentInspection)
  }

  showElement(item) {
    switch (item.type) {
      case 'photo':
        this.props.navigation.navigate('CameraScreen', { readonly: true, imageUri: item.uri, back: 'ROInspection' })
        break
      case 'video':
        this.props.navigation.navigate('VideoScreen', { readonly: true, uri: item.uri, back: 'ROInspection' })
        break
      case 'voice':
        this.props.navigation.navigate('RecorderScreen', { readonly: true, uri: item.uri, back: 'ROInspection' })
        break
    }
  }

  render() {
    if (this.props.currentInspection === undefined ||
      !this.props.currentInspection.elements) {
      return null
    }

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
                    showEditButton: true
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
      </View>
    )
  }
}

function mapStoreStateToProps(storeState) {
  return {
    currentUser: storeState.auth.currentUser,
    projects: storeState.models.projects,
    currentInspection: storeState.models.currentInspection,
    inspections: storeState.models.inspections,
    requestError: storeState.ui.requests.error
  }
}
export default connect(mapStoreStateToProps)(ROInspectionScreen)
