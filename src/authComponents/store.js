// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import applicationReducer from './applicationSlice'; 

export default configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer, 
  },
});
