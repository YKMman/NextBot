import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // Используем sessionStorage
import telegramUserSlice from './telegramUserSlice/telegramUserSlice';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ["_persist"],
};

const persistedReducer = persistReducer(persistConfig, telegramUserSlice);

export { persistedReducer, persistStore };