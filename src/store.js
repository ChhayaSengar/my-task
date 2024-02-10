// store.js
import { createStore } from 'redux';

// Action types
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

// Action creators
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
    
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

// Initial state
const initialState = {
  user: "null",
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
