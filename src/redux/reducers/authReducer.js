import {
    STORE_JWT,
    RESET,
  } from '../actions/authActions'
  
  // Initial State
  const initialState = {
    token: undefined,
  };
  
  // Reducers (Modifies The State And Returns A New State)
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case STORE_JWT: {
        return {
          // State
          ...state,
          // Redux Store
          token: action.token,
        }
      }
      case RESET: {
        return initialState
      }
      // Default
      default: {
        return state;
      }
    }
  };
  
  // Exports
  export default authReducer;