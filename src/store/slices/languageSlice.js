import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLanguage: 'fr',
  direction: 'ltr',
  translations: {}
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      state.direction = action.payload === 'ar' ? 'rtl' : 'ltr';
    },
    setTranslations: (state, action) => {
      state.translations = action.payload;
    }
  }
});

export const { setLanguage, setTranslations } = languageSlice.actions;
export default languageSlice.reducer;