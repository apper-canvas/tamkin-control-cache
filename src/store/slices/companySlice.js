import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companies: [],
  currentCompany: null,
  loading: false,
  error: null
};

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    },
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },
    updateCompany: (state, action) => {
      const index = state.companies.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    deleteCompany: (state, action) => {
      state.companies = state.companies.filter(c => c.id !== action.payload);
    }
  }
});

export const {
  setLoading,
  setError,
  setCompanies,
  setCurrentCompany,
  addCompany,
  updateCompany,
  deleteCompany
} = companySlice.actions;
export default companySlice.reducer;