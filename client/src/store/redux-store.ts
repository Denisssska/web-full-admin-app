import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

import { productReducer, userReducer } from './slices';


export type StateAppType = ReturnType<typeof reducersBox>;

const reducersBox = combineReducers({
  user: userReducer,
  product:productReducer,
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducersBox);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(thunk),
});
export const persistor = persistStore(store);

export default store;
// export type RootState = ReturnType<typeof  store.getState>
