import * as Action from '../js/actionTypes';

const DEFAULT_LOOKUPS = {
  settings: {}
};

export default function lookupsReducer(state = DEFAULT_LOOKUPS, action) {
  switch(action.type) {

    // Loaded once at init time, as they do not change very often, and
    // certainly not within the app.

    case Action.UPDATE_SETTINGS_LOOKUP:
      return { ...state, settings: action.settings };

    default:
      return state;
  }
}
