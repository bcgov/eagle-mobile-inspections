import React from 'react'
import { connect } from 'react-redux'
import {
  Alert,
  ScrollView,
  TextInput,
  Text,
  AsyncStorage,
  View,
  Button
} from 'react-native'
import { ListItem, Input } from 'react-native-elements'
import { HeaderBackButton } from 'react-navigation'
import DatePicker from 'react-native-datepicker'
import store from '../js/store'
import { uploadInspection } from '../api/eagleAPI'
import * as Action from '../js/actionTypes'
import { setupInspectionScreenStyles as styles } from '../styles/index.js'
import Geolocation from '@react-native-community/geolocation'

class SetUpInspectionScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: 'Inspection Set Up',
      headerLeft: <HeaderBackButton onPress={() => params.promptBeforeNavigating(params.self)} />,
      headerRight: (
        <Button
          title="Save"
          type="clear"
          disabled={params ? params.disableSave : true}
          onPress={() => params.saveInspection(params.self)}
        />
      )
    }
  };

  constructor(props) {
    super(props)

    this.handleStoreStateChange = this.handleStoreStateChange.bind(this)
    this.state = {
      name: props.currentInspection.name,
      project: props.currentInspection.project,
      customProjectName: props.currentInspection.customProjectName,
      startDate: props.currentInspection.startDate,
      endDate: props.currentInspection.endDate,
      case: props.currentInspection.case,
      label: props.currentInspection.label,
      inspectionUpdatedFlag: false,
      unsub: store.subscribe(this.handleStoreStateChange),
      focusListener: null,
      params: props.navigation.state.params
    }
  }

  saveInspection(self) {
    self.props.currentInspection.name = self.state.name
    self.props.currentInspection.startDate = self.state.startDate
    self.props.currentInspection.endDate = self.state.endDate
    self.props.currentInspection.case = self.state.case
    self.props.currentInspection.label = self.state.label

    // Persist this into the inspections array
    // Find it if it exists, otherwise it's a new one.
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
    self.props.navigation.goBack(null)
  }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i
      }
    }
    return -1 // to handle the case where the value doesn't exist
  }

  addNewElement() {
    this.props.navigation.navigate('ElementScreen', { ...this.state.params })
  }

  componentDidMount() {
    console.log('componentDidMount')

    // Ask
    Geolocation.requestAuthorization()

    this.props.navigation.setParams({ promptBeforeNavigating: this.promptBeforeNavigating })
    this.props.navigation.setParams({ saveInspection: this.saveInspection })
    this.props.navigation.setParams({ disableSave: true })
    this.props.navigation.setParams({ self: this })

    this.setState({
      focusListener: this.props.navigation.addListener('didFocus', () => {
        this.validateForm()
      })
    })
  }

  componentWillUnmount() {
    // // Remove the listener when you are done
    this.state.focusListener.remove()
    this.state.unsub()
  }

  handleStoreStateChange() {
    // console.log('handle store state change curr', this.props.currentInspection);
    // console.log('handle store state change insps', this.props.inspections);
    const storingValue = JSON.stringify(store.getState())
    // console.log('storingValue', storingValue);
    AsyncStorage.setItem('completeStore', storingValue)
    this.setState(this.props.currentInspection)
  }

  promptBeforeNavigating(self) {
    if (self.state.inspectionUpdatedFlag) {
      Alert.alert(
        // title
        'Warning',
        // body
        'Your changes have not been saved. Would you like to discard them?',
        [
          { text: 'Yes', onPress: () => self.props.navigation.goBack(null) },
          { text: 'Cancel', onPress: () => console.log('No Pressed'), style: 'cancel' }
        ],
        { cancelable: false }
      )
    } else {
      self.props.navigation.goBack(null)
    }
  }

  selectProjectComponent() {
    const { navigate } = this.props.navigation
    navigate('SelectProject', { onSelectProject: this.onSelectProject })
  }

  changeInspectionName(text) {
    this.setState({ name: text })
    this.setState({ inspectionUpdatedFlag: true })
  }

  changeStartDate(dateString) {
    if (this.areDatesValid(true, dateString)) {
      this.setState({
        startDate: this.convertDateStringToJSDate(dateString)
      }, () => {
      })
      this.setState({ inspectionUpdatedFlag: true })
    } else {
      this.setState({
        startDate: this.convertDateStringToJSDate(dateString)
      }, () => {
        this.validateForm()
      })
    }
  }

  changeEndDate(dateString) {
    if (this.areDatesValid(false, dateString)) {
      this.setState({
        endDate: this.convertDateStringToJSDate(dateString)
      }, () => {
        this.validateForm()
      })
      this.setState({ inspectionUpdatedFlag: true })
    } else {
      this.setState({
        endDate: null
      }, () => {
        this.validateForm()
      })
    }
  }

  areDatesValid(isStartDate, dateString) {
    if (isStartDate) {
      if (this.state.endDate == null) {
        return true
      } else if (this.state.endDate >= this.convertDateStringToJSDate(dateString)) {
        return true
      } else {
        Alert.alert('Your dates are invalid.')
        setTimeout(() => Alert.alert('Your dates are invalid.'), 1000)
        return false
      }
    } else {
      if (this.state.startDate == null) {
        return true
      } else if (this.state.startDate <= this.convertDateStringToJSDate(dateString)) {
        return true
      } else {
        setTimeout(() => Alert.alert('Your dates are invalid.'), 1000)
        return false
      }
    }
  }

  changeCase(text) {
    this.setState({ case: text })
    this.setState({ inspectionUpdatedFlag: true })
  }

  changeLabel(text) {
    this.setState({ label: text })
    this.setState({ inspectionUpdatedFlag: true })
  }

  validateForm() {
    if (
      this.state.name === null || this.state.name === '' ||
      (this.state.project === null && this.state.customProjectName === null) ||
      this.state.startDate === null ||
      this.state.endDate === null
    ) {
      this.props.navigation.setParams({ disableSave: true })
    } else {
      this.props.navigation.setParams({ disableSave: false })
    }
  }

  convertDateStringToJSDate(dateString) {
    var dateArray = dateString.split('-')
    var date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
    return date.toISOString()
  }

  async submitInspection(self) {
    const resp = await uploadInspection(self.props.currentUser, self.props.currentInspection)
    if (resp && resp.status === 'Submitted') {
      self.props.currentInspection.status = 'Submitted'
      self.props.navigation.navigate('Inspections')
    }
    self.saveInspection(self)
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
            <Input key='inspectionName'
              onChangeText={(text) => this.changeInspectionName(text)}
              title='Inspection Name'
              placeholder="Inspection Name"
              value={this.state.name}
              onEndEditing={() => this.validateForm()}
            />
          </View>

          <View>
            {this.state.project &&
              <ListItem
                key={this.state.project._id}
                title={this.state.project.name}
                rightIcon={{ name: 'chevron-right', style: { color: 'white' } }}
                leftIcon={{ name: 'assignment-ind', style: { color: 'white' } }}
                onPress={() => this.selectProjectComponent()}
              />
            }
            {this.state.customProjectName &&
              <ListItem
                key='custom'
                title={this.state.customProjectName}
                rightIcon={{ name: 'chevron-right', style: { color: 'white' } }}
                leftIcon={{ name: 'assignment-ind', style: { color: 'white' } }}
                onPress={() => this.selectProjectComponent()}
              />
            }
            {!this.state.project && !this.state.customProjectName &&
              <ListItem
                key='default'
                title='select project'
                rightIcon={{ name: 'chevron-right', style: { color: 'white' } }}
                leftIcon={{ name: 'assignment-ind', style: { color: 'white' } }}
                onPress={() => this.selectProjectComponent()}
              />
            }
          </View>

          <View style={styles.dateContainer}>
            <View>
              <Text>Start Date</Text>
              <DatePicker
                style={{ width: 150 }}
                date={this.state.startDate} // initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={date => { this.changeStartDate(date) }}
              />
            </View>
            <View>
              <Text>End Date</Text>
              <DatePicker
                style={{ width: 150 }}
                date={this.state.endDate} // initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => { this.changeEndDate(date) }}
              />
            </View>
          </View>
          <View>
            <Input key='email'
              leftIcon={{ name: 'email' }}
              placeholder={this.props.currentInspection.email}
              editable={false}
              title='Email'
            />
          </View>

          <View>
            <Input key='caseNumber'
              leftIcon={{ name: 'folder-open' }}
              onChangeText={(text) => this.changeCase(text)}
              title='Inspection Number'
              placeholder="Inspection Number"
              value={this.state.case}
            />
          </View>

          <View>
            <TextInput
              multiline={true}
              numberOfLines={4}
              height={250}
              placeholder="Notes"
              style={{ borderWidth: 1, borderColor: '#d6d7da', marginBottom: 15, marginTop: 15 }}
              value={this.state.label}
              onChangeText={(text) => this.changeLabel(text)}
            />
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
export default connect(mapStoreStateToProps)(SetUpInspectionScreen)
