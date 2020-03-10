import React from 'react'
import { connect } from 'react-redux'
import { Alert, Linking } from 'react-native'
import Login from 'react-native-login-keycloak'
import * as querystring from 'query-string'

import { UPDATE_OFFLINE_SWITCH, UPDATE_AUTH_STATE, UPDATE_CURRENT_USER, REFRESH_AUTH, FORCE_LOGIN } from '../js/actionTypes'
import { AUTH_SIGNED_IN, ROLE_ADMIN, AUTH_SIGNED_OUT } from '../js/constants'
import { PATH_ADMIN } from '../js/paths'
import AppNavigator from '../navigation/AppNavigator'
import { Buffer } from 'buffer'

const config = {
  url: 'https://sso.pathfinder.gov.bc.ca/auth',
  realm: 'eagle',
  clientId: 'eagle-mobile-app',
  redirectUri: 'epicmobile://login',
  kcIdpHint: 'idir'
}

class AuthWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.getNewToken = this.getNewToken.bind(this)
    this._handleOpenURL = this._handleOpenURL.bind(this)
    this.handleAuthStateChange = this.handleAuthStateChange.bind(this)
  }

  componentDidMount() {
    console.log('AuthWrapper: componentDidMount')
    Linking.addEventListener('url', this._handleOpenURL)
    this.props.dispatch({ type: UPDATE_OFFLINE_SWITCH, isOffline: true })
    this.props.dispatch({ type: UPDATE_CURRENT_USER, user: null })
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL)
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    // Doesn't work on iOS
    // return JSON.parse(window.atob(base64));
    return JSON.parse(Buffer.from(base64, 'base64').toString())
  };

  async _handleOpenURL(event) {
    // console.log("event:", event);
    try {
      const { state, code } = querystring.parse(querystring.extract(event.url))

      // Now exchange code for token.
      this.getNewToken(code)
    } catch (e) {
      console.log('---------------------------------------------------------------------------------------e:', e)
    }
  }

  updateToken = async() => {
    if (this.props.isOffline) {
      return null
    }
    // console.log("Update Token", this.props.currentUser);
    try {
      const theURL = config.url + '/realms/' + config.realm + '/protocol/openid-connect/token?'
      const body = querystring.stringify({
        grant_type: 'refresh_token',
        client_id: 'eagle-mobile-app',
        refresh_token: this.props.currentUser.refresh_token
      })
      // console.log("body:", body);
      // console.log("TheURL:", theURL);
      const response = await fetch(theURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      })

      console.log('Fetch Response:', response)
      var json = await response.json()
      // console.log("JSON:", json);

      if (json === null) {
        // Error
        Alert.alert(
          // title
          'Warning',
          // body
          'Token Refresh Failed.  Try logging in again?',
          [
            { text: 'Yes', onPress: () => Login.startLoginProcess(config) },
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                console.log('No Pressed')
                this.setState({
                  authenticated: false
                })
                this.props.dispatch({ type: UPDATE_AUTH_STATE, authState: AUTH_SIGNED_OUT })
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        this.props.dispatch({ type: UPDATE_OFFLINE_SWITCH, isOffline: false })
        this.setState({
          authenticated: true,
          token: json.access_token
        })
        // Update user token
        const currentUser = {
          jwtToken: json.access_token,
          refresh_token: json.refresh_token,
          expires_in: json.expires_in,
          decoded: this.parseJwt(json.access_token)
        }

        // console.log("getNewToken result:");
        this.props.dispatch({ type: UPDATE_CURRENT_USER, user: currentUser })
        this.props.dispatch({ type: UPDATE_AUTH_STATE, authState: AUTH_SIGNED_IN })

        // Calculate 75% of expiry time to go fetch and store a new jwtToken
        // for subsquent calls.
        const seconds = json.expires_in * 0.75 * 1000
        console.log('Checking for a new token in:', seconds)
        setTimeout(() => {
          this.updateToken()
        }, seconds)
      }
    } catch (e) {
      console.log('Error:', e)
      Alert.alert(
        // title
        'Your session has ended',
        // body
        'Would you like to log in?',
        [
          {
            text: 'Login',
            onPress: () => {
              Login.startLoginProcess(config)
            }
          },
          {
            text: 'Stay Offline',
            style: 'cancel',
            onPress: () => {
              this.props.dispatch({ type: UPDATE_OFFLINE_SWITCH, isOffline: true })
              this.props.dispatch({ type: UPDATE_CURRENT_USER, user: null })
            }
          }
        ],
        { cancelable: false }
      )
    }
  }

  getNewToken = async(code) => {
    console.log('NewTokengetNewToken:', code)
    try {
      const theURL = config.url + '/realms/' + config.realm + '/protocol/openid-connect/token?'
      const body = querystring.stringify({
        grant_type: 'authorization_code',
        redirect_uri: 'epicmobile://login',
        client_id: 'eagle-mobile-app',
        code: code
      })
      // console.log("TheURL:", theURL);
      const response = await fetch(theURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      })
      // console.log("Fetch Response:", response);
      var json = await response.json()
      // console.log("JSON:", json);

      if (json === null) {
        console.log('Err: json null')
        // Error
        Alert.alert(
          // title
          'Warning',
          // body
          'Token Refresh Failed.  Try logging in again?',
          [
            {
              text: 'Log In',
              onPress: () => {
                Login.startLoginProcess(config)
              }
            },
            {
              text: 'Stay Offline',
              style: 'cancel',
              onPress: () => {
                this.setState({
                  authenticated: false
                })
                this.props.dispatch({ type: UPDATE_OFFLINE_SWITCH, isOffline: true })
                this.props.dispatch({ type: UPDATE_CURRENT_USER, user: null })
                console.log('No Pressed')
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        console.log('Online')
        this.props.dispatch({ type: UPDATE_OFFLINE_SWITCH, isOffline: false })
        this.setState({
          authenticated: true,
          token: json.access_token
        })
        // Update user token
        const currentUser = {
          jwtToken: json.access_token,
          refresh_token: json.refresh_token,
          expires_in: json.expires_in,
          decoded: this.parseJwt(json.access_token)
        }

        this.props.dispatch({ type: UPDATE_CURRENT_USER, user: currentUser })
        this.props.dispatch({ type: UPDATE_AUTH_STATE, authState: AUTH_SIGNED_IN })

        // Calculate 75% of expiry time to go fetch and store a new jwtToken
        // for subsquent calls.
        const seconds = json.expires_in * 0.75 * 1000
        console.log('Checking for a new token in:', seconds)
        setTimeout(() => {
          this.updateToken()
        })
      }
    } catch (e) {
      console.log('Error:', e)
      Alert.alert(
        // title
        'Your session has ended',
        // body
        'Would you like to log in?',
        [
          {
            text: 'Log In',
            onPress: () => {
              Login.startLoginProcess(config)
            }
          },
          {
            text: 'Stay Offline',
            style: 'cancel',
            onPress: () => {
              this.props.dispatch({ type: UPDATE_OFFLINE_SWITCH, isOffline: true })
              this.props.dispatch({ type: UPDATE_CURRENT_USER, user: null })
            }
          }
        ],
        { cancelable: false }
      )
    }
  }

  handleAuthStateChange(authState, user) {
    this.props.dispatch({ type: UPDATE_AUTH_STATE, authState: authState })
    if (authState === AUTH_SIGNED_IN) {
      this.updateCurrentUser(user)
    }
  }

  updateCurrentUser(user) {
    if (user && user.signInUserSession) {
      const role = user.signInUserSession.idToken.payload['cognito:groups'][0]

      let homePage, orgId
      switch (role) {
      case ROLE_ADMIN:
        homePage = `/${PATH_ADMIN}`
        break
      default:
        homePage = '/'
        orgId = null
      }

      const currentUser = {
        cognitoUser: user,

        username: user.username,
        email: user.signInUserSession.idToken.payload.email,
        role: role,
        homepage: homePage,
        orgId: orgId,

        jwtToken: user.signInUserSession.idToken.jwtToken
      }

      this.props.dispatch({ type: UPDATE_CURRENT_USER, user: currentUser })
    }
  }

  render() {
    if (this.props.refresh === true) {
      setTimeout(() => {
        this.props.dispatch({ type: REFRESH_AUTH, refresh: false })
      }, 10)
      this.updateToken()
    }

    // We received a request to force us to log in..
    if (this.props.forceLogin === true) {
      setTimeout(() => {
        this.props.dispatch({ type: FORCE_LOGIN, forceLogin: false })
      }, 10)
      console.log('STARTING')
      Login.startLoginProcess(config)
    }
    return (
      <AppNavigator>

      </AppNavigator>
    )
  }
}

const mapStateToProps = storeState => {
  return {
    refresh: storeState.models.refresh,
    currentUser: storeState.auth.currentUser,
    forceLogin: storeState.auth.forceLogin
  }
}

export default connect(mapStateToProps)(AuthWrapper)
