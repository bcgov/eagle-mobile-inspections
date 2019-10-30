import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { ListItem } from 'react-native-elements'
import Moment from 'moment';

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
    super(props);
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
    this.props.navigation.navigate('ROInspection', { inspectionId: inspection.inspectionId });
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
                      showEditButton: false,
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
                      showEditButton: false,
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  submittedScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

const mapStateToProps = storeState => {
  return {
    currentUser: storeState.auth.currentUser,
    inspections: storeState.models.inspections
  };
};

export default connect(mapStateToProps)(SubmittedScreen);