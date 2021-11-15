// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import userDataCompanyReduecer from './userDataCompanyReduecer';

// Redux: Root Reducer
const rootReducer = combineReducers({
    authReducer: authReducer,
    userDataCompanyReduecer: userDataCompanyReduecer
});

// Exports
export default rootReducer;