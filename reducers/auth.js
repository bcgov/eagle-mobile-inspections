import * as Action from '../js/actionTypes';

const DEFAULT_AUTH = {
  authState: '',
  forceLogin: false,

  currentUser: {
    cognitoUser: null,

    username: "",
    email: "",
    role: "",
    homepage: "/",
    org: "",

    jwtToken: ""
  }
};

export default function authReducer(state = DEFAULT_AUTH, action) {
  switch(action.type) {
    case Action.UPDATE_AUTH_STATE:
      return { ...state, authState: action.authState };

    case Action.UPDATE_OFFLINE_SWITCH:
      return { ...state, isOffline: action.isOffline };

    case Action.UPDATE_CURRENT_USER:
      return { ...state, currentUser: action.user };

    case Action.FORCE_LOGIN:
      return { ...state, forceLogin: action.forceLogin };

    default:
      return state;
  }
}
