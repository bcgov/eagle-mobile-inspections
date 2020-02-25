import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import allReducers from '../reducers/all'

const store = createStore(allReducers, devToolsEnhancer())

export default store
