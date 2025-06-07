import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import asyncStorageConstants from '@/utils/asyncStorageConstants';
import { clearStorage, getItem } from '@/utils/asyncStorage';

interface UserState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
      // saveUserToStorage(storageConstants.USER, action.payload); // Save user data to storage
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      clearStorage(); // Clear async storage
    },
    updateUser: (state, action: PayloadAction<Partial<any>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    loadUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
      state.token = action.payload.accessToken;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { login, logout, updateUser, loadUser } = userSlice.actions;

export default userSlice.reducer;
