import React from 'react';
import { connect } from 'react-redux'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button, Icon } from 'react-native-elements'
import { withNavigationFocus } from "react-navigation";
import SelectProjectScreen from './SelectProjectScreen';
import { createStackNavigator } from 'react-navigation';
import { RNCamera } from 'react-native-camera';

import store from '../js/store';
import * as Action from '../js/actionTypes';
import Video, { FilterType } from 'react-native-video';

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

class VideoScreen extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isFocused;
  }
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      params: props.navigation.state.params,
      uri: null,
      isRecording: false,
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      controls: false,
      paused: true,
      skin: 'custom',
      ignoreSilentSwitch: null,
      isBuffering: false,
      filter: FilterType.NONE,
      filterEnabled: true
    }
  }

  renderSkinControl(skin) {
    const isSelected = this.state.skin == skin;
    const selectControls = skin == 'native' || skin == 'embed';
    return (
      <TouchableOpacity onPress={() => {
        this.setState({
          controls: selectControls,
          skin: skin
        })
      }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {skin}
        </Text>
      </TouchableOpacity>
    );
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({ resizeMode: resizeMode }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({ volume: volume }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  renderIgnoreSilentSwitchControl(ignoreSilentSwitch) {
    const isSelected = (this.state.ignoreSilentSwitch == ignoreSilentSwitch);

    return (
      <TouchableOpacity onPress={() => { this.setState({ ignoreSilentSwitch: ignoreSilentSwitch }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {ignoreSilentSwitch}
        </Text>
      </TouchableOpacity>
    )
  }

  async saveVideo() {
    // Save to this inspection's redux
    let curr = this.props.items;
    let data = await new Promise(function (r, j) {
      navigator.geolocation.getCurrentPosition(function (loc) {
        // console.log("location:", loc);
        r(loc);
      }, function (err) {
        console.log("err:", err);
        r(null);
      });
    });
    // Safety for lat/long
    if (!curr) {
      curr = [];
    }

    if (data !== null) {
      curr.push({ type: 'video', uri: this.state.imageUri, geo: data.coords, caption: '', timestamp: new Date().toISOString() });
    } else {
      curr.push({ type: 'video', uri: this.state.imageUri, geo: [0.0, 0.0], caption: '', timestamp: new Date().toISOString() });
    }
    store.dispatch({ type: Action.UPDATE_ITEMS, items: curr });
    this.props.navigation.navigate('AddCaptionScreen', { back: this.state.params.back });
  }

  goBackToEdit() {
    this.props.navigation.navigate(this.state.params.back);
  }

  goBack() {
    console.log("FOO:", this.state.params.back);
    this.props.navigation.navigate(this.state.params.back, { inspectionId: this.props.currentInspection.inspectionId });
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.params);
    this.props.navigation.setParams({ saveVideo: this.saveVideo });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  launchVideo = async () => {
    this.player.presentFullscreenPlayer();
  }

  takeVideo = async () => {
    if (this.camera) {

      if (this.state.isRecording) {
        console.log("stop recording");
        this.camera.stopRecording();
      } else {
        this.setState({ isRecording: true });
        console.log("start recording");
      }

      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          const data = await promise;
          this.setState({ isRecording: false });
          console.warn('takeVideo', data);
          this.setState({ uri: data.uri });
          this.player.presentFullscreenPlayer();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  goToCamera() {
    this.setState({ uri: null });
  }

  render() {
    const isFocused = this.props.isFocused;

    if (!isFocused) {
      return null;
    } else {
      let { uri } = this.state;

      let readonly = this.props.navigation.getParam('readonly', false);
      let theURI = this.props.navigation.getParam('uri', null);

      if (readonly) {
        uri = theURI;
      }

      if (uri) {
        return (
          <View style={styles.container}>

            <View style={styles.fullScreen}>
              <Video source={{ uri: uri }}   // Can be a URL or a local file.
                ref={(ref) => {
                  this.player = ref
                }}                                      // Store reference
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={this.videoError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo}
                rate={this.state.rate}
                paused={this.state.paused}
                onLoad={this.onLoad}
                onProgress={this.onProgress}
                repeat={false}
              />
              <View style={styles.controls}>
                <View style={styles.generalControls}>
                  <View style={styles.skinControl}>
                    {!readonly &&
                      <Button
                        onPress={this.goToCamera.bind(this)}
                        type="clear"
                        icon={
                          <Icon
                            name="backspace"
                            type='material'
                            color='white'
                            size={50}
                          />
                        }
                      />
                    }
                    {
                      readonly &&
                      <Button
                        onPress={this.goBack.bind(this)}
                        type="clear"
                        icon={
                          <Icon
                            name="backspace"
                            type='material'
                            color='white'
                            size={50}
                          />
                        }
                      />
                    }
                    <Button
                      onPress={this.launchVideo.bind(this)}
                      type="clear"
                      icon={
                        <Icon
                          name="play-arrow"
                          type='material'
                          color='white'
                          size={50}
                        />
                      }
                    />
                    {!readonly &&
                      <Button
                        onPress={this.saveVideo.bind(this)}
                        type="clear"
                        icon={
                          <Icon
                            name="save"
                            type='material'
                            color='white'
                            size={50}
                          />
                        }
                      />
                    }
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.containerVideo}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
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
              </View>
              <View style={styles.bottomButtons}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>
                  {
                    this.state.isRecording && <Button
                      onPress={this.takeVideo.bind(this)}
                      type="clear"
                      icon={
                        <Icon
                          name="stop"
                          type='material'
                          color='white'
                          size={50}
                        />
                      }
                    />
                  }
                  {
                    !this.state.isRecording && <Button
                      onPress={this.takeVideo.bind(this)}
                      type="clear"
                      icon={
                        <Icon
                          name="videocam"
                          type='material'
                          color='white'
                          size={50}
                        />
                      }
                    />
                  }
                </View>
                <View style={{ flex: 1 }}></View>
              </View>
            </RNCamera>
          </View>
        );
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
    requestError: storeState.ui.requests.error,
  };
}
export default connect(mapStoreStateToProps)(withNavigationFocus(VideoScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  bottomButtons: {
    flex: 0.1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  containerVideo: {
    flex: 1,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'orange'
  },
  topButtons: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'center',
    height: 50,
    marginTop: 40
  },
  centeredBottomButton: {
    flex: 0.1,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  },
  bottomButtons: {
    flex: 0.1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  testContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
});
