import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './Slices/auth';
import { bookmarkSlice } from './Slices/bookmark';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'bookmark'],
  log: true,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  bookmark: bookmarkSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
