import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

import { userReducer } from './slices/userReducer';

export type StateAppType = ReturnType<typeof reducersBox>;

const reducersBox = combineReducers({
  user: userReducer,
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
