import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi } from '../../api/userApi';

import { ProfileSchemaType, SignInSchemaType, SignUpSchemaType } from '../../utils';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  newUser: null,
  currentUser: null as unknown as ProfileSchemaType,
  allUsers:null as unknown as ProfileSchemaType[],
  enjoyedUser: null as unknown as ProfileSchemaType,
  loading: false,
  error: false,
  errorText: '',
};

export const loginTC = createAsyncThunk(
  '/auth/loginTC',
  async ({ email, password }: SignInSchemaType, thunkAPI) => {
    try {
      thunkAPI.dispatch(userActions.start());
      const response = await userApi.signIn({ email, password });

      if (!response.ok) {
        const errorText = response.statusText;
        console.log(errorText);

        thunkAPI.dispatch(userActions.failure(errorText));
        throw new Error(errorText || 'something was wrong');
      }
      const data = await response.json();
      thunkAPI.dispatch(userActions.signInSuccess(data));
      return data;
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const logoutTC = createAsyncThunk('/auth/logoutTC', async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(userActions.start());
    await userApi.logout();
    localStorage.removeItem('persist:root');
    thunkAPI.dispatch(userActions.logout());
  } catch (e: any) {
    console.log(e);
    thunkAPI.dispatch(userActions.failure(e.message));
    return thunkAPI.rejectWithValue(e.message);
  }
});
export const signUpTC = createAsyncThunk(
  '/auth/signupTC',
  async ({ email, password, username }: SignUpSchemaType, thunkAPI) => {
    try {
      thunkAPI.dispatch(userActions.start());
      const response = await userApi.registration({ email, password, username });
      const data = await response.json();
      if (!response.ok) {
        const errorText = response.statusText;
        console.log(errorText);

        thunkAPI.dispatch(userActions.failure(errorText));
        throw new Error(errorText || 'something was wrong' || JSON.stringify(data));
      }

      thunkAPI.dispatch(userActions.signUpSuccess(data.message));
    } catch (e: any) {
      console.log(e);
      thunkAPI.dispatch(userActions.failure(e.message));
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const updateUserImgTC = createAsyncThunk('/auth/updateUserImgTC', async (body: FormData, thunkAPI) => {
  try {
    thunkAPI.dispatch(userActions.start());
    const response = await userApi.updateUserImg(body);
    const data = await response?.json();
    if (!response?.ok) {
      const errorText = response?.statusText;
      console.log(errorText);

      thunkAPI.dispatch(userActions.failure(errorText));
      throw new Error(errorText || 'something was wrong' || JSON.stringify(data));
    }

    thunkAPI.dispatch(userActions.updateImgSuccess(data.secure_url));
    return data.secure_url;
  } catch (e: any) {
    thunkAPI.dispatch(userActions.failure(e.message));
    return thunkAPI.rejectWithValue(e.message);
  }
});
export const updateUserTC = createAsyncThunk('/auth/updateUserTC', async (body: UpdateUser, thunkAPI) => {
  try {
    thunkAPI.dispatch(userActions.start());
    const res = await userApi.updateUser(body);
    const data = await res?.json();

    if (!res?.ok) {
      const errorText = res?.statusText;
      console.log(errorText);

      thunkAPI.dispatch(userActions.failure(errorText));
      throw new Error(errorText || 'something was wrong' || JSON.stringify(data));
    }

    thunkAPI.dispatch(userActions.signInSuccess(data));
    return data;
  } catch (e: any) {
    thunkAPI.dispatch(userActions.failure(e.message));

    return thunkAPI.rejectWithValue(e.message);
  }
});
export const getAllUsersTC = createAsyncThunk('/auth/getAllUsersTC', async (_, thunkAPI) => {
  thunkAPI.dispatch(userActions.start());
  try {
    const res = await userApi.getAllUsers();
    const data = await res?.json();

    if (!res?.ok) {
      const errorText = res?.statusText;
      console.log(errorText);

      thunkAPI.dispatch(userActions.failure(errorText));
      throw new Error(errorText || 'something was wrong' || JSON.stringify(data));
    }

    thunkAPI.dispatch(userActions.getAllUsersSuccess(data));
    return data;
  } catch (e: any) {
    thunkAPI.dispatch(userActions.failure(e.message));

    return thunkAPI.rejectWithValue(e.message);
  }
});
export const getUserTC = createAsyncThunk('/auth/getUserTC', async (userId:string, thunkAPI) => {
  thunkAPI.dispatch(userActions.start());
  try {
    const res = await userApi.getUser(userId);
    const data = await res?.json();

    if (!res?.ok) {
      const errorText = res?.statusText;
      console.log(errorText);

      thunkAPI.dispatch(userActions.failure(errorText));
      throw new Error(errorText || 'something was wrong' || JSON.stringify(data));
    }

    thunkAPI.dispatch(userActions.getUserSuccess(data));
    return data;
  } catch (e: any) {
    thunkAPI.dispatch(userActions.failure(e.message));

    return thunkAPI.rejectWithValue(e.message);
  }
});
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    resetNewUser: state => {
      state.newUser = null;
    },
    start: state => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.allUsers = action.payload;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.enjoyedUser = action.payload;
    },
    signUpSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.newUser = action.payload;
    },
    updateImgSuccess: (state, action: PayloadAction<string>) => {
      // state.loading = false;
      state.error = false;
      state.currentUser.profilePhoto = action.payload;
    },
    failure: (state, action) => {
      state.loading = false;
      state.newUser = null;
      state.error = true;
      state.errorText = action.payload;
    },
    logout: state => {
      state.newUser = null;
      state.currentUser = null as unknown as ProfileSchemaType;
      state.loading = false;
      state.error = false;
      state.errorText = '';
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(loginTC.fulfilled, (state, action) => {
  //     // console.log(action.payload);
  //   });
  //   builder.addCase(loginTC.rejected, (state, action) => {
  //     console.log(action.payload);
  //   });
  // },
});
export const { reducer: userReducer, actions: userActions } = userSlice;
