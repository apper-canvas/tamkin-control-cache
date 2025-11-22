import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import languageReducer from './slices/languageSlice';
import companyReducer from './slices/companySlice';
import siteReducer from './slices/siteSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    companies: companyReducer,
    sites: siteReducer,
    users: userReducer
  }
});