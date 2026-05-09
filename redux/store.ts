import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './features/languageSlice';
import surveyReducer from './features/surveySlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    survey: surveyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
