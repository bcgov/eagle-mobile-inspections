import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Text,
  View,
  Dimensions
} from 'react-native'
import { Image } from 'react-native-elements'
import { previewElementScreenStyles as styles } from '../styles/index.js'
import { getCoordStamp } from '../utils/geo.js'

class PreviewElementScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: 'Element Preview'
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      params: props.navigation.state.params,
      imageUri: null
    }
    console.log('PARAMS:', props.navigation.state.params.index)
  }

  goBackToEdit() {
    this.props.navigation.navigate(this.state.params.back)
  }

  goBack() {
    this.props.navigation.navigate(this.state.params.back, { inspectionId: this.props.currentInspection.inspectionId })
  }

  componentDidMount() {
    this.props.navigation.setParams({ saveImage: this.saveImage })
  }

  componentWillUnmount() {
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      this.setState({ imageUri: data.uri })
      console.log(data.uri)
    }
  };

  goToCamera() {
    this.setState({ imageUri: null })
  }

  render() {
    let { imageUri } = this.state
    const { caption, timestamp, geo } = this.state.params.item
    const readableTimestamp = new Date(timestamp).toDateString()
    const readonly = this.props.navigation.getParam('readonly', false)
    const uri = this.props.navigation.getParam('imageUri', null)

    // Saved images store their geo data as an array. Images coming from the camera
    // Generate the coords here
    const coords = getCoordStamp(geo)
    const win = Dimensions.get('window')

    if (readonly) {
      imageUri = uri
    }

    console.log('URI:', uri)
    // Preview of image that has already been saved
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <ScrollView
              maximumZoomScale={2.5}
              minimumZoomScale={1}
              pinchGestureEnabled={true}
            >
              <Image
                style={{ width: win.width, height: 540 }}
                source={{ uri: imageUri }}
                resizeMode='contain'
              />
            </ScrollView>
          </View>
          <View style={{ margin: 25 }}>
            {!coords
              ? <Text>No GPS data available</Text>
              : <Fragment>
                <Text>Lat: {geo.Northing}</Text>
                <Text>Lon: {geo.Easting}</Text>
                <Text>Zone: {geo.ZoneNumber}+{geo.ZoneLetter}</Text>
              </Fragment>
            }
            <Text>Caption: {caption}</Text>
            <Text>Timestamp: {readableTimestamp}</Text>
          </View>
        </View>
      </ScrollView>
    )
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
export default connect(mapStoreStateToProps)(PreviewElementScreen)
