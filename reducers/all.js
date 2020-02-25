import { combineReducers } from 'redux'

import uiReducer from './ui'
import authReducer from './auth'
import modelsReducer from './models'

export default combineReducers({
  ui: uiReducer,
  auth: authReducer,
  models: modelsReducer
})
