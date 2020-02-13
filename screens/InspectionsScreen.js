import React from 'react'
import { ScrollView, View, ImageBackground, Button, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { getLocalInspections } from '../js/api'
import * as uuid from 'react-native-uuid'
import store from '../js/store'
import * as Action from '../js/actionTypes'
import Moment from 'moment'
import { InspectionsScreenStyles as styles } from '../styles/baseStyleSheets'

class LogoTitle extends React.Component {
  render() {
    return (
      <ImageBackground source={require('../assets/images/bcgov-header-vert-SM.png')} style={{ width: 50, height: 50 }}>
      </ImageBackground>
    )
  }
}

// Pending Inspections Screen
class InspectionsScreen extends React.Component {
  constructor(props) {
    super(props)

    this.addNewInspection = this.addNewInspection.bind(this)
    // this.submitAll = this.submitAll.bind(this);
    this.goToInspection = this.goToInspection.bind(this)

    this.state = {
      loading: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: 'Inspections', // <LogoTitle />,
      headerRight: (
        <Button
          title="Add Inspection"
          onPress={() => params.addNewInspection()}
        />
      )
    }
  };

  saveInspection(item) {
    let inspections = []
    if (this.props.inspections && this.props.inspections.length > 0) {
      inspections = [...this.props.inspections]
      const idx = this.getIndex(item.inspectionId, inspections, 'inspectionId')

      if (idx !== -1) {
        inspections[idx] = item
      }
      console.log('Fixed old')
    } else {
      console.log('Pushing new')
      inspections.push(item)
    }
    store.dispatch({ type: Action.UPDATE_INSPECTIONS, inspections: inspections })
  }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i
      }
    }
    return -1 // to handle the case where the value doesn't exist
  }

  addNewInspection() {
    // TODO Nav to the add inspection component.
    const { navigate } = this.props.navigation

    let emailDisplay = 'offline mode'
    try {
      emailDisplay = this.props.currentUser.decoded.email
    } catch (e) {
      // Offline
      console.log('e:', e)
    }

    // Create a new inspection and put it into currentInspection datastore.
    const unique = uuid.v4()
    store.dispatch({
      type: Action.CURRENT_INSPECTION,
      currentInspection: {
        inspectionId: unique,
        elements: [],
        status: 'Pending',
        email: emailDisplay
      }
    })
    // Setup the default array
    navigate('SetUpInspectionScreen', { inspectionId: unique })
  }

  componentDidMount() {
    // Ask
    navigator.geolocation.requestAuthorization()

    this.props.navigation.setParams({ addNewInspection: this.addNewInspection })
    // this.props.navigation.setParams({ submitAll: this.submitAll });
    this.props.navigation.setParams({ self: this })
    this.fetch()
    const { navigation } = this.props
    navigation.addListener('willFocus', () => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  fetch = async() => {
    console.log('fetching...')
    this.setState({ loading: true })
    // This gets all the non-submitted inspections
    await getLocalInspections()
    this.setState({ loading: false })
  }

  goToInspection(inspection) {
    this.props.navigation.navigate('InspectionDetailsScreen', { inspectionId: inspection.inspectionId })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
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
                        showEditButton: true
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
                          showEditButton: true
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
      )
    }
  }
}

function mapStoreStateToProps(storeState) {
  return {
    currentUser: storeState.auth.currentUser,
    inspections: storeState.models.inspections,
    requestError: storeState.ui.requests.error,
    authState: storeState.auth.authState
  }
}
export default connect(mapStoreStateToProps)(InspectionsScreen)
