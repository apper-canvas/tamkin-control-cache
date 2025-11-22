import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sites: [],
  currentSite: null,
  loading: false,
  error: null
};

const siteSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSites: (state, action) => {
      state.sites = action.payload;
    },
    setCurrentSite: (state, action) => {
      state.currentSite = action.payload;
    },
    addSite: (state, action) => {
      state.sites.push(action.payload);
    },
    updateSite: (state, action) => {
      const index = state.sites.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.sites[index] = action.payload;
      }
    },
    deleteSite: (state, action) => {
      state.sites = state.sites.filter(s => s.id !== action.payload);
    }
  }
});

export const {
  setLoading,
  setError,
  setSites,
  setCurrentSite,
  addSite,
  updateSite,
  deleteSite
} = siteSlice.actions;
export default siteSlice.reducer;