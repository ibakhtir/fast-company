import { createAction, createSlice } from "@reduxjs/toolkit";

import history from "../utils/history";
import createAvatar from "../utils/createAvatar";
import getRandomInt from "../utils/getRandomInt";
import generateAuthErrors from "../utils/generateAuthErrors";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import {
  setTokens,
  getAccessToken,
  getUserId,
  removeAuthData
} from "../services/localStorage.service";

const initialStateNotAuth = {
  entities: null,
  isLoading: true,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false
};

const initialStateAuth = {
  entities: null,
  isLoading: true,
  error: null,
  auth: { userId: getUserId() },
  isLoggedIn: true,
  dataLoaded: false
};

const initialState = getAccessToken() ? initialStateAuth : initialStateNotAuth;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccessed: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    userRemoved: (state, action) => {
      state.entities = state.entities.filter((u) => u._id !== action.payload);
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
    },
    authRequested: (state) => {
      state.error = null;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccessed,
  authRequestFailed,
  userCreated,
  userUpdated,
  userRemoved,
  userLoggedOut
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
const userRemoveRequested = createAction("users/userRemoveRequested");
const userRemoveFailed = createAction("users/userRemoveFailed");

export function login({ payload, redirect }) {
  return async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      setTokens(data);
      dispatch(authRequestSuccessed({ userId: data.localId }));
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthErrors(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };
}

function createUser(payload) {
  return async (dispatch) => {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
      history.push("/users");
    } catch (error) {
      dispatch(userCreateFailed(error.message));
    }
  };
}

export function signUp({ email, password, ...rest }) {
  return async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      setTokens(data);
      dispatch(authRequestSuccessed({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: getRandomInt(1, 5),
          completedMeetings: getRandomInt(0, 200),
          image: createAvatar("avataaars"),
          ...rest
        })
      );
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };
}

export function logOut() {
  return (dispatch) => {
    removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
  };
}

export function loadUsersList() {
  return async (dispatch) => {
    dispatch(usersRequested());
    try {
      const { content } = await userService.get();
      dispatch(usersReceived(content));
    } catch (error) {
      dispatch(usersRequestFailed(error.message));
    }
  };
}

export function updateUser(payload) {
  return async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
      const { content } = await userService.update(payload);
      dispatch(userUpdated(content));
      history.push(`/users/${content._id}`);
    } catch (error) {
      dispatch(userUpdateFailed(error.message));
    }
  };
}

export function removeUser(userId) {
  return async (dispatch) => {
    dispatch(userRemoveRequested());
    try {
      const { content } = await userService.remove(userId);
      if (!content) {
        dispatch(userRemoved(userId));
      }
    } catch (error) {
      dispatch(userRemoveFailed(error.message));
    }
  };
}

export function getUserById(userId) {
  return (state) =>
    state.users.entities && state.users.entities.find((u) => u._id === userId);
}

export function getCurrentUserId() {
  return (state) => state.users?.auth?.userId;
}

export function getCurrentUserData() {
  return (state) => {
    if (state.users.entities) {
      return state.users.entities.find(
        (u) => u._id === state.users.auth.userId
      );
    }
    return null;
  };
}

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthError = () => (state) => state.users.error;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;

export default usersReducer;
