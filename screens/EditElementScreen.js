import React from 'react'
import { connect } from 'react-redux'
import {
  TextInput,
  ScrollView,
  Alert,
  Linking,
  Text,
  View
} from 'react-native'
import Moment from 'moment'
import ImagePicker from 'react-native-image-picker'
import { renderTouchables } from '../js/components'
import { Input, Button } from 'react-native-elements'

import { HeaderBackButton } from 'react-navigation'
import SimplePicker from 'react-native-simple-picker'
import store from '../js/store'
import * as Action from '../js/actionTypes'
import { editElementScreenStyles as styles } from '../styles/index.js'
import { elementOptions } from '../js/config'
import { getCoordStamp } from '../utils/geo';


// Edit Element Screen
class EditElementScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    let title = 'Element'
    if (!params.readonly) {
      title = 'Edit Element'
    }
    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: title,
      headerLeft: <HeaderBackButton onPress={() => params.promptBeforeNavigating(params.self)} />,
      headerRight: !params.readonly &&
        <Button
          title="Save"
          type="clear"
          onPress={() => params.saveElement(params.self)}
        />
    }
  };

  constructor(props) {
    super(props)

    this.handleStoreStateChange = this.handleStoreStateChange.bind(this)

    this.state = {
      title: props.currentInspection.elements[props.navigation.state.params.index].title,
      requirement: props.currentInspection.elements[props.navigation.state.params.index].requirement,
      description: props.currentInspection.elements[props.navigation.state.params.index].description,
      items: props.currentInspection.elements[props.navigation.state.params.index].items,
      addDescription: '',
      elementChangedFlag: false,
      unsub: store.subscribe(this.handleStoreStateChange),
      params: props.navigation.state.params,
      index: props.navigation.state.params.index
    }
  }

  saveElement(self) {
    // Nav back to the other screen
    // Add each element
    const items = []
    self.props.items.forEach(item => {
      items.push(item)
    })
    if (!self.props.currentInspection.elements[self.state.params.index].items) {
      self.props.currentInspection.elements[self.state.params.index].items = []
    }
    self.props.currentInspection.elements[self.state.params.index].items.forEach(item => {
      items.push(item)
    })

    // TODO add photo/voice/etc items
    self.props.currentInspection.elements[self.state.params.index] = {
      title: self.state.title,
      requirement: self.state.requirement,
      description: (self.state.addDescription === undefined || self.state.addDescription === '') ? self.props.currentInspection.elements[self.state.params.index].description : self.props.currentInspection.elements[self.state.params.index].description + '\n***\n' + self.state.addDescription,
      items: items,
      timestamp: new Date()
    }

    // Add this new element to the main inspection.
    let inspections = []
    if (self.props.inspections && self.props.inspections.length > 0) {
      inspections = [...self.props.inspections]
      const idx = self.getIndex(self.props.currentInspection.inspectionId, inspections, 'inspectionId')

      if (idx !== -1) {
        console.log('updating inspection @', idx)
        inspections[idx] = self.props.currentInspection
      } else {
        console.log('adding inspection')
        inspections.push(self.props.currentInspection)
      }
    } else {
      inspections.push(self.props.currentInspection)
    }
    store.dispatch({ type: Action.UPDATE_INSPECTIONS, inspections: inspections })
    store.dispatch({ type: Action.UPDATE_ITEMS, items: [] })
    self.props.navigation.goBack(null)
  }

  promptBeforeNavigating(self) {
    if (self.state.elementChangedFlag) {
      Alert.alert(
        // title
        'Warning',
        // body
        'Your changes have not been saved. Would you like to discard them?',
        [
          { text: 'Yes', onPress: () => store.dispatch({ type: Action.UPDATE_ITEMS, items: [] }) && self.props.navigation.goBack(null) },
          { text: 'Cancel', onPress: () => console.log('No Pressed'), style: 'cancel' }
        ],
        { cancelable: false }
      )
    } else {
      // Just go back.
      store.dispatch({ type: Action.UPDATE_ITEMS, items: [] })
      self.props.navigation.goBack(null)
    }
  }

  removeInspection(self) {
    let inspections = []
    if (self.props.inspections && self.props.inspections.length > 0) {
      inspections = [...self.props.inspections]
      const idx = self.getIndex(self.props.currentInspection.inspectionId, inspections, 'inspectionId')

      if (idx !== -1) {
        console.log('updating inspection @', idx)
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
    this.props.navigation.setParams({ saveElement: this.saveElement })
    this.props.navigation.setParams({ promptBeforeNavigating: this.promptBeforeNavigating })
    this.props.navigation.setParams({ self: this })
  }

  componentWillUnmount() {
    this.state.unsub()
  }

  handleStoreStateChange() {
    this.setState({ items: this.props.items })
  }

  async addGPS() {
    // Add GPS to text area
    let data = await new Promise(async function (r, j) {
      navigator.geolocation.getCurrentPosition(async function (loc) {
        console.log("LOC:", loc);
        r(loc);
      }, async function (err) {
        console.log("err:", err);
        r(null);
      });
    });
    let curr = this.state.addDescription;
    let coords = getCoordStamp(data);
    this.setState({
      description: curr + '\nEasting: ' +
        coords.Easting + ', Northing: ' +
        coords.Northing + ', UTM Zone: ' +
        coords.ZoneNumber + coords.ZoneLetter +
        '\n',
      elementChangedFlag: true
    });
  }

  async addDateStamp() {
    // Add Date to text area
    const date = new Date()
    let curr = this.state.addDescription
    curr = curr + '\n' + Moment(date).format('MMMM DD, YYYY HH:mm:ss') + '\n'
    this.setState({ addDescription: curr, elementChangedFlag: true })
  }

  showElement(item) {
    switch (item.type) {
      case 'photo':
        this.props.navigation.navigate('PreviewElementScreen', { readonly: true, imageUri: item.uri, item: item, back: 'EditElementScreen' })
        break
      case 'video':
        this.props.navigation.navigate('VideoScreen', { readonly: true, uri: item.uri, back: 'EditElementScreen' })
        break
      case 'voice':
        this.props.navigation.navigate('RecorderScreen', { readonly: true, uri: item.uri, item: item, back: 'EditElementScreen' })
        break
    }
  }

  async openTheodolite() {
    const url = 'theodolite://';
    return Linking.openURL(url).then(() => { }).catch((e) => {
      // console.log("Couldn't open theodolite", e);
      setTimeout(() => {
        Alert.alert(
          // title
          'Error',
          // body
          'Theodolite not installed.',
          [
            { text: 'OK', onPress: () => { } }
          ],
          { cancelable: false }
        )
      }, 1000)
    })
  }

  async getMediaFromLibrary() {
    const options = {
      noData: true
      // mediaType: 'mixed'
    }
    setTimeout(() => {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri) {
          this.saveImage(response)
        }
      })
    }, 1000)
  }

  async saveImage(response) {
    let curr = this.props.items
    if (!curr) {
      curr = []
    }

    var type = ''
    if (response.type.includes('image')) {
      type = 'photo'
    } else if (response.type.includes('video')) {
      type = 'video'
    } else {
      // Unsupported type
      return
    }

    let geoCoords = { "latitude": response.latitude, "longitude": response.longitude }
    let coords = getCoordStamp(geoCoords)
    // Safety for lat/long
    curr.push(
      {
        type: type,
        uri: response.uri,
        geo: [coords.Easting ? coords.Easting : 0, coords.Northing ? coords.Northing : 0, coords.ZoneNumber, coords.ZoneLetter],
        caption: '',
        timestamp: response.timestamp ? response.timestamp : new Date().toISOString()
      }
    )
    store.dispatch({ type: Action.UPDATE_ITEMS, items: curr })

    this.props.navigation.navigate('AddCaptionScreen', { ...this.state.params, back: 'EditElementScreen' })
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
            <Input key='title'
              onChangeText={(title) => this.setState({ title: title, elementChangedFlag: true })}
              title='Title'
              placeholder="Title"
              editable={this.state.params.readonly !== true}
              value={this.state.title}
            />
          </View>

          <View>
            <Input key='requirement'
              onChangeText={(requirement) => this.setState({ requirement: requirement, elementChangedFlag: true })}
              title='Requirement'
              placeholder="Requirement"
              editable={this.state.params.readonly !== true}
              value={this.state.requirement}
            />
          </View>

          <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10 }}>
            <Text>Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={20}
              height={250}
              placeholder=""
              style={{ borderWidth: 1, borderColor: '#d6d7da' }}
              value={this.state.description}
              editable={false}
            />
          </View>
          {!this.state.params.readonly &&
            <View>
              <View style={{ margin: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Button
                    style={{ marginBottom: 2 }}
                    title="GPS Stamp"
                    onPress={() => this.addGPS()}
                  />
                  <Text style={{ fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Add Description</Text>
                  <Button
                    style={{ marginBottom: 2 }}
                    title="Date Stamp"
                    onPress={() => this.addDateStamp()}
                  />
                </View>
                <TextInput
                  multiline={true}
                  numberOfLines={20}
                  height={250}
                  placeholder=""
                  style={{ borderWidth: 1, borderColor: '#d6d7da', marginBottom: 15 }}
                  value={this.state.addDescription}
                  onChangeText={(addDescription) => this.setState({ addDescription, elementChangedFlag: true })}
                />
              </View>
            </View>
          }
          <View style={{
            margin: 10,
            flex: 1,
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            alignContent: 'flex-start'
          }}>
            {
              this.props.currentInspection.elements.length > 0 && this.props.currentInspection.elements[this.state.params.index].items && this.props.currentInspection.elements[this.state.params.index].items.length > 0 && this.props.currentInspection.elements[this.state.params.index].items.map((p, i) => {
                if (p.type === 'photo') {
                  return (
                    renderTouchables(i, { uri: p.uri }, p, styles, () => this.showElement(p))
                  )
                } else if (p.type === 'video') {
                  return (
                    renderTouchables(i, require('../assets/images/video.png'), p, styles, () => this.showElement(p))
                  )
                } else if (p.type === 'voice') {
                  return (
                    renderTouchables(i, require('../assets/images/voice.png'), p, styles, () => this.showElement(p))
                  )
                } else if (p.type === 'text') {
                  return (
                    renderTouchables(i, require('../assets/images/text.png'), p, styles, () => this.showElement(p))
                  )
                }
              })}
          </View>
          {!this.state.params.readonly &&
            <View style={{
              margin: 10,
              flex: 1,
              flexDirection: 'column',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              alignContent: 'flex-start'
            }}>
              {
                this.props.items.length > 0 && this.props.items.map((p, i) => {
                  if (p.type === 'photo') {
                    return (
                      renderTouchables(i, { uri: p.uri }, p, styles, () => this.showElement(p))
                    )
                  } else if (p.type === 'video') {
                    return (
                      renderTouchables(i, require('../assets/images/video.png'), p, styles, () => this.showElement(p))
                    )
                  } else if (p.type === 'voice') {
                    return (
                      renderTouchables(i, require('../assets/images/voice.png'), p, styles, () => this.showElement(p))
                    )
                  } else if (p.type === 'text') {
                    return (
                      renderTouchables(i, require('../assets/images/text.png'), p, styles, () => this.showElement(p))
                    )
                  }
                })}
            </View>
          }
        </ScrollView>
        {!this.state.params.readonly && <Button
          style={{ marginBottom: 2, marginTop: 2, marginLeft: 20, marginRight: 20 }}
          title="Add Item"
          onPress={() => this.refs.picker.show()}
        />}
        <SimplePicker
          ref={'picker'}
          options={elementOptions}
          onSubmit={(option) => {
            switch (option) {
              case 'Theodolite':
                this.openTheodolite()
                break
              case 'Photo':
                this.props.navigation.navigate('CameraScreen', { ...this.state.params, back: 'EditElementScreen' })
                break
              case 'Video':
                this.props.navigation.navigate('VideoScreen', { ...this.state.params, back: 'EditElementScreen' })
                break
              case 'Voice':
                this.props.navigation.navigate('RecorderScreen', { ...this.state.params, back: 'EditElementScreen' })
                break
              case 'Choose from library':
                this.getMediaFromLibrary()
                break
              default:
              // Fall through
            }
            this.setState({ elementChangedFlag: true })
          }}
        />
      </View>
    )
  }
}

function mapStoreStateToProps(storeState) {
  return {
    currentUser: storeState.auth.currentUser,
    currentInspection: storeState.models.currentInspection,
    inspections: storeState.models.inspections,
    requestError: storeState.ui.requests.error,
    items: storeState.models.items
  }
}
export default connect(mapStoreStateToProps)(EditElementScreen)
