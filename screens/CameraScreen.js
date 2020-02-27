import React from 'react'
import { connect } from 'react-redux'
import {
  ImageBackground,
  View,
  Image
} from 'react-native'
import { cameraScreenStyles as styles } from '../styles/index.js'
import { Button, Icon } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation'
import { RNCamera } from 'react-native-camera'

import store from '../js/store'
import * as Action from '../js/actionTypes'

class CameraScreen extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isFocused
  }

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
    this.state = {
      params: props.navigation.state.params,
      imageUri: null,
      imageHeight: null,
      imageWidth: null,
      useFlash: false
    }
  }

  async saveImage() {
    // Save to this inspection's redux
    let curr = this.props.items
    const data = await new Promise(function(r, j) {
      navigator.geolocation.getCurrentPosition(function(loc) {
        r(loc)
      }, function(err) {
        console.log('err:', err)
        r(null)
      })
    })

    if (!curr) {
      curr = []
    }

    let coords = getCoordStamp(data);
    // Safety for lat/long
    if (data !== null) {
<<<<<<< HEAD
      curr.push({ type: 'photo', uri: this.state.imageUri, geo: data.coords, caption: '', timestamp: new Date().toISOString() })
=======
      curr.push({ type: 'photo', uri: this.state.imageUri, geo: coords, caption: '', timestamp: new Date().toISOString() });
>>>>>>> replace setting of lat & lons with utm coords for inspection elements
    } else {
      curr.push({ type: 'photo', uri: this.state.imageUri, geo: [0.0, 0.0], caption: '', timestamp: new Date().toISOString() })
    }
    store.dispatch({ type: Action.UPDATE_ITEMS, items: curr })

    this.props.navigation.navigate('AddCaptionScreen', { back: this.state.params.back })
  }

  goBackToEdit() {
    this.props.navigation.navigate(this.state.params.back)
  }

  goBack() {
    this.props.navigation.navigate(this.state.params.back, { inspectionId: this.props.currentInspection.inspectionId })
  }

  componentDidMount() {
    console.log('CameraScreen: componentDidMount')
    this.props.navigation.setParams({ saveImage: this.saveImage })
    this.fetch()
  }

  componentWillUnmount() {
    console.log('CameraScreen: componentWillUnmount')
  }

  fetch = async() => {
    console.log('fetching...')
    this.setState({ loading: true })
    // await getLocalInspections();
    this.setState({ loading: false })
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      this.setState({ imageUri: data.uri })

      // Get the height and width.
      Image.getSize(data.uri, (width, height) => {
        this.setState({
          imageWidth: width,
          imageHeight: height
        })
      })
    }
  };

  goToCamera() {
    this.setState({ imageUri: null })
  }

  switchFlash() {
    this.setState(previousState => ({ useFlash: !previousState.useFlash }))
  }

  render() {
    const isFocused = this.props.isFocused
    if (!isFocused) {
      return null
    } else {
      // Image from camera
      const { imageUri, imageHeight, imageWidth } = this.state
      let controlColour = 'white'

      // Determine the colour of the controls. Make them dark if the image is landscape.
      if (imageWidth > imageHeight) {
        controlColour = 'black'
      }

      if (imageUri) {
        // Preview of image if image is new.s
        return (
          <View>
            <ImageBackground
              source={{ uri: imageUri }}
              style={{ width: '100%', height: '100%' }}
              resizeMode='contain'
            >
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <View style={{ flex: 0.9 }} />
                <View style={styles.bottomButtons}>
                  <Button
                    onPress={this.goToCamera.bind(this)}
                    type="clear"
                    icon={
                      <Icon
                        name="backspace"
                        type='material'
                        color={controlColour}
                        size={50}
                      />
                    }
                  />
                  <Button
                    onPress={this.saveImage.bind(this)}
                    type="clear"
                    icon={
                      <Icon
                        name="save"
                        type='material'
                        color={controlColour}
                        size={50}
                      />
                    }
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        )
      } else {
        // Take photo
        return (
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={this.state.useFlash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel'
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel'
              }}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes)
              }}
            >
              <View style={styles.topButtons}>
                <Button
                  type="clear"
                  onPress={this.goBackToEdit.bind(this)}
                  icon={
                    <Icon
                      name="chevron-left"
                      type='material'
                      color='white'
                      size={50}
                    />
                  }
                />
                <Button
                  type="clear"
                  onPress={this.switchFlash.bind(this)}
                  icon={
                    <Icon
                      name={this.state.useFlash ? 'flash-on' : 'flash-off'}
                      type='material'
                      color='white'
                      size={40}
                    />
                  }
                />
              </View>
              <View style={styles.bottomButtons}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>
                  <Button
                    onPress={this.takePicture.bind(this)}
                    type="clear"
                    icon={
                      <Icon
                        name="camera"
                        type='material'
                        color='white'
                        size={50}
                      />
                    }
                  />
                </View>
                <View style={{ flex: 1 }}></View>
              </View>
            </RNCamera>
          </View>
        )
      }
    }
  }
}

function mapStoreStateToProps(storeState) {
  return {
    inspections: storeState.models.inspections,
    currentUser: storeState.auth.currentUser,
    projects: storeState.models.projects,
    currentInspection: storeState.models.currentInspection,
    items: storeState.models.items,
    requestError: storeState.ui.requests.error
  }
}
export default connect(mapStoreStateToProps)(withNavigationFocus(CameraScreen))
