import {
  SET_USER_COMPANY
} from '../actions/userDataCompanyActions';

// Initial State
const initialState = {
};

// Reducers (Modifies The State And Returns A New State)
const userCompany = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_COMPANY: {
      
      return {
        ...state,
        data: action.data
      }
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default userCompany;