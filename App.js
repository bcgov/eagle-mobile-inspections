import React from 'react'
import { ListItem } from 'react-native-elements'
import { AppStyles as styles } from './styles'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import AuthWrapper from './utils/AuthWrapper'

import store from './js/store'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keycloak: null,
      authenticated: false,
      token: ''
    }
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      title={item.title}
      badge={{ value: '3', textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
    />
  )

  render() {
    return (
      <AuthWrapper>

      </AuthWrapper>
    )
  }

  _loadResourcesAsync = async() => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/bcgov-header-vert-MD.png')
      ]),
      Font.loadAsync({
        ...Icon.FontAwesome.font
      })
    ])
  };

  _handleLoadingError = error => {
    console.warn(error)
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  };
}

export default class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}
