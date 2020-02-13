import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TextInput,
  ScrollView,
  View
} from 'react-native'

import { HeaderBackButton } from 'react-navigation'

import { Button } from 'react-native-elements'
import { AddCaptionScreenStyles as styles } from '../styles'
import store from '../js/store'
import * as Action from '../js/actionTypes'

class AddCaptionScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#003366'
      },
      headerTitle: 'Add Caption',
      headerLeft: <HeaderBackButton onPress={() => params.promptBeforeNavigating(params.self)} />,
      headerRight: (
        <Button
          title="Save"
          type="clear"
          onPress={() => params.saveCaption(params.self)}
        />
      )
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      params: props.navigation.state.params,
      caption: ''
    }
  }

  async saveCaption(self) {
    self.props.items[self.props.items.length - 1].caption = self.state.caption
    store.dispatch({ type: Action.UPDATE_ITEMS, items: self.props.items })
    self.props.navigation.navigate(self.state.params.back)
  }

  promptBeforeNavigating(self) {
    self.props.items.pop()
    store.dispatch({ type: Action.UPDATE_ITEMS, items: self.props.items })
    self.props.navigation.goBack(null)
  }

  componentDidMount() {
    this.props.navigation.setParams({ promptBeforeNavigating: this.promptBeforeNavigating })
    this.props.navigation.setParams({ saveCaption: this.saveCaption })
    this.props.navigation.setParams({ self: this })
  }

  componentWillUnmount() {
  }

  handleStoreStateChange() {
  }

  render() {
    if (this.props.items === undefined ||
      this.props.items.length === 0) {
      return null
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ScrollView style={styles.container}>
          <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10 }}>
            <Text>Caption</Text>
            <TextInput
              multiline={true}
              numberOfLines={20}
              height={250}
              placeholder=""
              style={{ borderWidth: 1, borderColor: '#d6d7da', marginBottom: 15 }}
              value={this.state.caption}
              onChangeText={(caption) => this.setState({ caption })}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

function mapStoreStateToProps(storeState) {
  return {
    items: storeState.models.items
  }
}
export default connect(mapStoreStateToProps)(AddCaptionScreen)
