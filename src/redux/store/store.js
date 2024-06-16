import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import customizationReducer from 'store/customizationReducer';
import heroReducer from '../reducers/heroReducer';
import aboutReducer from '../reducers/aboutReducer';
import approachReducer from '../reducers/approachReducer';
import messageReducer from '../reducers/messageReducer';

const rootReducer = combineReducers({
  customization: customizationReducer,
  hero: heroReducer,
  about: aboutReducer,
  approach: approachReducer,
  message: messageReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;

