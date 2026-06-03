import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import languageReducer from "./slices/languageSlice";
import surveyReducer from "./slices/surveySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  survey: surveyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
