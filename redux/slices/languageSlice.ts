import { createSlice } from "@reduxjs/toolkit";

type LanguageState = {
  lang: "en" | "de";
};

const initialState: LanguageState = {
  lang: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.lang = state.lang === "en" ? "de" : "en";
    },
    setLanguage: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
