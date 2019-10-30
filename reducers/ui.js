import * as Action from '../js/actionTypes';

const DEFAULT_UI = {
  requests: {
    waiting: false,
    error: null,
  },
};

export default function uiReducer(state = DEFAULT_UI, action) {
  switch(action.type) {
    // Requests

    case Action.REQUESTS_BEGIN:
      return { ...state, requests: {
        waiting: true,
        error: null,
      }};

    case Action.REQUESTS_END:
      return { ...state, requests: { ...state.requests, ...{ waiting: false } } };

    case Action.REQUESTS_ERROR:
      return { ...state, requests: { ...state.requests, ...{ error: action.error } } };

    case Action.REQUESTS_CLEAR:
      return { ...state, requests: { waiting: false, error: null } };

    default:
      return state;
  }
}
