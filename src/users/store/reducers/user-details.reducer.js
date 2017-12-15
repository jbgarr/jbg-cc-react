import {
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_SUCCESS,
  LOAD_USER_DETAILS_FAIL
} from '../actions/users.actions';

import { getUserDataByLogin } from './users.reducer';

const initialState = {
  loading: false,
  loaded: false,
  error: '',
  activeUserId: ''
};

export const userDetails = (state = initialState, action) => {
  switch (action.type) {
     
    case LOAD_USER_DETAILS: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }
    
    case LOAD_USER_DETAILS_SUCCESS: {
      const activeUserId = action.payload.id;

      return {
        ...state,
        loading: false,
        loaded: true,
        activeUserId,
        error: ''
      }
    }

    case LOAD_USER_DETAILS_FAIL: {
      const error = action.payload;

      return {
        ...state,
        loading: false,
        loaded: true,
        error 
      }
    }
  }

  return state;
}

/*---------------------------------------
/ Selectors
----------------------------------------*/

export const getActiveUserDetails = (state, userLogin) => {
  return getUserDataByLogin(state, userLogin);
}
