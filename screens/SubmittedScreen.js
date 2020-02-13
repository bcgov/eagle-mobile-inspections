import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import { ListItem } from 'react-native-elements'
import Moment from 'moment'
import { submittedScreenStyles as styles } from '../styles/index.js'
import { connect } from 'react-redux'

// Submitted Screen (house)
class SubmittedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: 'Submitted'
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      authState: 'loading'
    }
  }

  _renderAvatar(type) {
    switch (type) {
    case 'Energy-Electricity':
      return 'plug'
    case 'Mines':
      return 'gears'
    case 'Energy-Petroleum & Natural Gas':
      return 'fire'
    case 'Tourist Destination Resorts':
      return 'image'
    case 'Waste Disposal':
      return 'trash'
    case 'Water Management':
      return 'tint'
    case 'Industrial':
      return 'industry'
    case 'Transportation':
      return 'car'
    default:
      return 'industry'
    }
  }

  componentDidMount() {
  }

  goToInspection(inspection) {
    this.props.navigation.navigate('ROInspection', { inspectionId: inspection.inspectionId })
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView style={styles.container}>
            <View>
              {
                this.props.inspections && this.props.inspections.map((l, i) => (
                  l.status === 'Submitted' && (l.customProjectName) &&
                  <ListItem
                    bottomDivider
                    leftAvatar={{
                      title: l.elements.length.toString() || '0',
                      source: { uri: l.avatar_url },
                      showEditButton: false
                    }}
                    key={i}
                    rightIcon={{ name: 'chevron-right', style: { color: 'white' } }}
                    title={l.name}
                    onPress={() => { this.goToInspection(l) }}
                    rightSubtitle={Moment(l.startDate).format('YYYY-MM-DD') + ' ' + Moment(l.endDate).format('YYYY-MM-DD')}
                    subtitle={l.customProjectName}
                    subtitleStyle={{ color: 'green' }}
                  />
                ))
              }
              {
                this.props.inspections && this.props.inspections.map((l, i) => (
                  l.status === 'Submitted' && (!l.customProjectName) &&
                  <ListItem
                    bottomDivider
                    leftAvatar={{
                      title: l.elements.length.toString() || '0',
                      source: { uri: l.avatar_url },
                      showEditButton: false
                    }}
                    key={i}
                    rightIcon={{ name: 'chevron-right', style: { color: 'white' } }}
                    title={l.name}
                    onPress={() => { this.goToInspection(l) }}
                    rightSubtitle={Moment(l.startDate).format('YYYY-MM-DD') + ' ' + Moment(l.endDate).format('YYYY-MM-DD')}
                    subtitle={l.project.name}
                    subtitleStyle={{ color: 'green' }}
                  />
                ))
              }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = storeState => {
  return {
    currentUser: storeState.auth.currentUser,
    inspections: storeState.models.inspections
  }
}

export default connect(mapStateToProps)(SubmittedScreen)
