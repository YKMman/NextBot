import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TDataUserOrEmpty = {
  id?: number;
  telegram_name?: string;
  telegram_id?: string;
  ttc_coin?: string;
};

interface UserDataState {
  userData: TDataUserOrEmpty[];
}

const initialState: UserDataState = {
  userData: [],
};

const telegramUserSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserTelegramData: (state, action: PayloadAction<TDataUserOrEmpty[]>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserTelegramData } = telegramUserSlice.actions;
export const selectUserData = (state: RootState) => state.telegramUser.userData;
export default telegramUserSlice.reducer;