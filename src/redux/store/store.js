// src/redux/store/store.js

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Ensure this is correct
import customizationReducer from 'store/customizationReducer';
import heroReducer from '../reducers/heroReducer';
import aboutReducer from '../reducers/aboutReducer';

const rootReducer = combineReducers({
  customization: customizationReducer,
  hero: heroReducer,
  about: aboutReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;

