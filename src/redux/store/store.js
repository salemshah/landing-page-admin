// src/redux/store/store.js

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Ensure this is correct
import heroReducer from '../reducers/heroReducer';
import customizationReducer from 'store/customizationReducer';

const rootReducer = combineReducers({
  hero: heroReducer,
  customization: customizationReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

