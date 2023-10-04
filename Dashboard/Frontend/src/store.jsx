import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer'; // Update the import path

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
