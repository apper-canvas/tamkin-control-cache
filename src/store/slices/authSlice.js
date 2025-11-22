import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: "user-1",
    email: "admin@tamkincontrol.ma",
    firstNameAr: "أحمد",
    firstNameFr: "Ahmed",
    firstNameEn: "Ahmed",
    lastNameAr: "المدير",
    lastNameFr: "Admin",
    lastNameEn: "Admin",
    role: "ceo",
    preferredLanguage: "fr",
    companyId: "company-1",
    siteId: null
  },
  isAuthenticated: true,
  permissions: []
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.permissions = [];
    }
  }
});

export const { setUser, setPermissions, logout } = authSlice.actions;
export default authSlice.reducer;