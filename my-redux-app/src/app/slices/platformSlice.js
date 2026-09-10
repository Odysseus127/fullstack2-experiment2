import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  notificationsEnabled: true,
  activeUsersCount: 120,
  loading: false,
  error: null,
};

const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setNotifications: (state, action) => {
      state.notificationsEnabled = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { toggleTheme, setNotifications ,setLoading, setError} = platformSlice.actions;
export default platformSlice.reducer;

export const selectTheme = (state) => state.platform.theme;
export const selectNotificationsEnabled = (state) => state.platform.notificationsEnabled;
export const selectActiveUsersCount = (state) => state.platform.activeUsersCount;
export const selectPlatformLoading = (state) => state.platform.loading;
export const selectPlatformError = (state) => state.platform.error;