import { Auth, API } from 'aws-amplify';

import * as Action from './actionTypes';
import * as Constant from './constants';
import * as Path from './paths';
import store from './store';

import AsyncStorage from '@react-native-community/async-storage';

var apiRequestCount = 0;

function startRequest() {
  apiRequestCount++;
  if (apiRequestCount === 1) {
    store.dispatch({ type: Action.REQUESTS_BEGIN });
  }
}

function endRequest() {
  apiRequestCount--;
  if (apiRequestCount <= 0) {
    apiRequestCount = 0;
    store.dispatch({ type: Action.REQUESTS_END });
  }
}

export function handleError(error) {
  let errMsg = 'There was an error processing your request.';
  if (error && error.response && error.response.data && error.response.data.message) {
    errMsg = error.response.data.message;
  } else if (error.message) {
    errMsg = error.message;
  } else if (typeof error === 'string') {
    errMsg = error;
  }

  store.dispatch({ type: Action.REQUESTS_ERROR, error: errMsg });

  return errMsg;
}

async function sendRequest(request, apiName, path, options) {
  try {
    startRequest();

    let params = {};

    // options.noAuthRequired = true for non-authenticated calls
    if (!options || options.noAuthRequired !== true) {
      const auth = await Auth.currentSession();

      params.headers = {
        Authorization: 'Bearer ' + auth.idToken.jwtToken
      };
    }

    if (options && options.body) {
      params.body = options.body;
    }

    const response = await request(apiName, path, params);

    endRequest();

    return response;
  } catch(err) {
    console.log("err:", err);
    handleError(err);
    endRequest();
    return [];
  }
}

async function get(apiName, path, params) {
  return sendRequest((apiName, path, params) => {
    return API.get(apiName, path, params)
  }, apiName, path, params);
}

async function post(apiName, path, body, options) {
  return sendRequest((apiName, path, params) => {
    return API.post(apiName, path, params)
  }, apiName, path, { body: body, ...options });
}

async function put(apiName, path, body, options) {
  return sendRequest((apiName, path, params) => {
    return API.put(apiName, path, params)
  }, apiName, path, { body: body, ...options });
}

async function del(apiName, path, body, options) {
  return sendRequest((apiName, path, params) => {
    return API.del(apiName, path, params)
  }, apiName, path, { body: body, ...options });
}

// Auth
export async function getLocalInspections() {
  let value = null;
  try {
    console.log("getting value")
    value = await AsyncStorage.getItem('completeStore')
    if(value && value.length) {
      // value previously stored
      let initialStore = JSON.parse(value)
      console.log("value found:", initialStore.models.inspections);
      store.dispatch({type: Action.GET_LOCAL_INSPECTIONS, inspections: initialStore.models.inspections});
    }
  } catch(e) {
    console.log('Error:', e);
  }
}

export async function storeInspection(inspection) {
  try {
    console.log("Storing item");
    let current = await AsyncStorage.getItem('@inspections')
    let currentInspections = [];
    if (current !== null) {
      currentInspections = JSON.parse(current);
    }
    console.log("Current inspections:", currentInspections);
    currentInspections.push(inspection);

    await AsyncStorage.setItem('@inspections', JSON.stringify(currentInspections));
  } catch (e) {
    // saving error
    console.log("Error:", e);
  }
}
