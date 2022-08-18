import { createSlice } from "@reduxjs/toolkit";

import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
  actions;

export function loadQualitiesList() {
  return async (dispatch) => {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualityService.getQualities();
      dispatch(qualitiesReceived(content));
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message));
    }
  };
}

export const getQualities = () => (state) => state.qualities.entities;

export function getQualitiesLoadingStatus() {
  return (state) => state.qualities.isLoading;
}

export function getQualitiesByIds(qualitiesIds) {
  return (state) => {
    const qualitiesArr = [];
    if (state.qualities.entities) {
      qualitiesIds.forEach((qualityId) => {
        state.qualities.entities.forEach((quality) => {
          if (quality._id === qualityId) {
            qualitiesArr.push(quality);
          }
        });
      });
    }
    return qualitiesArr;
  };
}

export default qualitiesReducer;
