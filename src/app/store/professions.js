import { createSlice } from "@reduxjs/toolkit";

import professionService from "../services/profession.service";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceived, professionsRequestFailed } =
  actions;

export function loadProfessionsList() {
  return async (dispatch) => {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.getProfessions();
      dispatch(professionsReceived(content));
    } catch (error) {
      dispatch(professionsRequestFailed(error.message));
    }
  };
}

export const getProfessions = () => (state) => state.professions.entities;

export function getProfessionsLoadingStatus() {
  return (state) => state.professions.isLoading;
}

export function getProfessionById(id) {
  return (state) =>
    state.professions.entities &&
    state.professions.entities.find((p) => p._id === id);
}

export default professionsReducer;
