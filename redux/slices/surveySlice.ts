import { createSlice } from '@reduxjs/toolkit';
import { TSurveyResults } from '../types';

export type TSurveyStep = 'initialView' | 'search' | 'analysis' | 'summary';

type TSurveyState = {
  step: TSurveyStep;
  summaryId: string;
  surveyResults: TSurveyResults | null;
  searchCity: string;
};

const initialState: TSurveyState = {
  step: 'initialView',
  summaryId: '',
  surveyResults: null,
  searchCity: '',
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.step === 'initialView') {
        state.step = 'search';
      } else if (state.step === 'search') {
        state.step = 'analysis';
      } else if (state.step === 'analysis') {
        state.step = 'summary';
      } else if (state.step === 'summary') {
        state.step = 'initialView';
      }
    },
    prevStep: (state) => {
      if (state.step === 'search') {
        state.step = 'initialView';
      } else if (state.step === 'analysis') {
        state.step = 'search';
      } else if (state.step === 'summary') {
        state.step = 'analysis';
      }
    },
    setSummaryId: (state, action) => {
      state.summaryId = action.payload;
      if (state.summaryId != '') {
        state.step = 'analysis';
      }
    },
    setSearchCity: (state, action) => {
      state.searchCity = action.payload;
    },
  },
});

export const { nextStep, prevStep, setSummaryId, setSearchCity } = surveySlice.actions;
export default surveySlice.reducer;
