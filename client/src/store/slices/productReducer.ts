import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { productApi } from '../../api/productApi';

import { userApi } from '../../api/userApi';

import { ProductsSchemaType } from '../../utils';

import { userActions } from './userReducer';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentProduct: {} as ProductsSchemaType,
  allProducts: [] as ProductsSchemaType[],
  error: false,
  errorText: '',
};

export const createProductTC = createAsyncThunk(
  '/auth/createProductTC',
  async (body: ProductCreation, thunkAPI) => {
    try {
      thunkAPI.dispatch(userActions.start());
      const data = await productApi.create(body);

      thunkAPI.dispatch(productActions.createSuccess(data));
      thunkAPI.dispatch(userActions.success());
      return data;
    } catch (e: any) {
      console.log(e);
      //пределать ошибки на отдельный редьюсер
      thunkAPI.dispatch(productActions.failure(e.message));
      thunkAPI.dispatch(userActions.failure(e.message));
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateProductImgTC = createAsyncThunk(
  '/auth/updateProductImgTC',
  async (body: FormData, thunkAPI) => {
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
  }
);
export const updateProductTC = createAsyncThunk(
  '/auth/updateProductTC',
  async (body: UpdateUser, thunkAPI) => {
    try {
      thunkAPI.dispatch(userActions.start());
      const data = await userApi.updateUser(body);

      thunkAPI.dispatch(userActions.signInSuccess(data));
      return data;
    } catch (e: any) {
      thunkAPI.dispatch(userActions.failure(e.message));

      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const getAllProductsTC = createAsyncThunk('/auth/getAllProductsTC', async (_, thunkAPI) => {
  thunkAPI.dispatch(userActions.start());
  try {
    const data = await productApi.getAll();
    thunkAPI.dispatch(productActions.getAllProductsSuccess(data));
    thunkAPI.dispatch(userActions.success());
    return data;
  } catch (e: any) {
    //пределать ошибки на отдельный редьюсер
    thunkAPI.dispatch(productActions.failure(e.message));
    thunkAPI.dispatch(userActions.failure(e.message));
    return thunkAPI.rejectWithValue(e.message);
  }
});
export const getProductTC = createAsyncThunk('/auth/getProductTC', async (userId: string, thunkAPI) => {
  thunkAPI.dispatch(userActions.start());
  try {
    const data = await userApi.getUser(userId);

    thunkAPI.dispatch(userActions.getUserSuccess(data));
    return data;
  } catch (e: any) {
    thunkAPI.dispatch(userActions.failure(e.message));

    return thunkAPI.rejectWithValue(e.message);
  }
});
const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    createSuccess: (state, action) => {
      state.error = false;
      state.currentProduct = action.payload;
    },
    getAllProductsSuccess: (state, action) => {
      state.error = false;
      state.allProducts = action.payload;
    },
    getUserSuccess: (state, action) => {
      state.error = false;
      state.currentProduct = action.payload;
    },

    updateImgSuccess: (state, action: PayloadAction<string>) => {
      // state.loading = false;
      state.error = false;
      state.currentProduct.img = action.payload;
    },
    failure: (state, action) => {
      state.error = true;
      state.errorText = action.payload;
    },
  },
});
export const { reducer: productReducer, actions: productActions } = productSlice;
