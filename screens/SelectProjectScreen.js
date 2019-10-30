import React from 'react';
import { connect } from 'react-redux'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { SearchBar, ListItem, Icon, Button } from 'react-native-elements';
import { getProjects } from '../api/eagleAPI';
import store from '../js/store';
import * as Action from '../js/actionTypes';
// Select Project Screen

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text>Inspections</Text>
      </View>
    );
  }
}

class SelectProjectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      projects: [],
      customProject: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: 'Select Project'
    }
  };

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
  }

  selectProject(item) {
    let curr = this.props.currentInspection;
    curr.project = item;
    curr.customProjectName = null;
    store.dispatch({ type: Action.UPDATE_INSPECTION, currentInspection: curr });
    this.props.navigation.goBack();
  }

  updateSearch = search => {
    var filtered = this.props.projects.filter(item => {
      return item.name.includes(search) || item.type.includes(search);
    });
    // Apply sort
    filtered.sort((a, b) => a.name < b.name ? -1 : 1);
    this.setState({ search: search, projects: filtered });
  };

  submitCustomProject(name) {
    let curr = this.props.currentInspection;
    curr.project = null;
    curr.customProjectName = name;
    store.dispatch({ type: Action.UPDATE_INSPECTION, currentInspection: curr });
    this.props.navigation.goBack();
  }

  fetch = async () => {
    this.setState({ loading: true });
    await getProjects();
    this.props.projects.sort((a, b) => a.name < b.name ? -1 : 1);
    this.setState({ loading: false, projects: this.props.projects });
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

  render() {
    const { search, projects, loading } = this.state;

      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <SearchBar style={styles.container}
              placeholder="Enter Project Name..."
              onChangeText={this.updateSearch}
              value={search}
            />
            <ScrollView style={styles.container}>

              <View style={styles.customProjectStyle}>
                <TextInput
                  placeholder="Add custom project"
                  onChangeText={(textEntry) => { this.setState({ customProject: textEntry }) }}
                  style={{ backgroundColor: 'transparent' }}
                />
                <Button
                  onPress={() => this.submitCustomProject(this.state.customProject)}
                  disabled={this.state.customProject === ''}
                  icon={
                    <Icon
                      name="add"
                      type='material'
                      size={20}
                    />
                  }
                />
              </View>


              <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  {
                    projects && projects.map((l, i) => (
                      <ListItem
                        key={i}
                        onPress={this.selectProject.bind(this, l)}
                        leftAvatar={<Icon
                          reverse
                          name={this._renderAvatar(l.type)}
                          type='font-awesome'
                          color='#517fa4'
                        />}
                        title={l.name}
                        subtitle={l.type}
                      />
                    ))
                  }
                  {
                    loading && projects && projects.length === 0 &&
                      <ActivityIndicator size="large" color="#000000" />
                  }
                  {
                    (!loading && projects && projects.length === 0) &&
                    <Text>
                      No Projects Found
                    </Text>
                  }
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View >
      )
    }
}

function mapStoreStateToProps(storeState) {
  return {
    inspections: storeState.models.inspections,
    currentUser: storeState.auth.currentUser,
    projects: storeState.models.projects,
    currentInspection: storeState.models.currentInspection,
    requestError: storeState.ui.requests.error,
  };
}
export default connect(mapStoreStateToProps)(SelectProjectScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  customProjectStyle: {
    flexDirection: 'row',
    width: window.width,
    margin: 10,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 5,
  }
});
