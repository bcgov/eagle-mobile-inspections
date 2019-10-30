import { createStore } from 'redux';

import allReducers from '../reducers/all';

const store = createStore(allReducers);

export default store;
