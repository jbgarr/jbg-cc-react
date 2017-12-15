import {
  UPDATE_USER_SEARCH_VALUE,
  SEARCH_FOR_USER,
  SEARCH_FOR_USER_SUCCESS,
  SEARCH_FOR_USER_FAIL,
  LOAD_TOP_USERS,
  LOAD_TOP_USERS_SUCCESS,
  LOAD_TOP_USERS_FAIL,
  LOAD_USER_DETAILS_SUCCESS,
  LOAD_USER_REPOS_SUCCESS
} from '../actions/users.actions';

const initialState = {
  currentSearchTerm: '',
  loading: false,
  loaded: false,
  message: '',
  entities: {
    ids: [], // array of logins
    data: {} // {login: user}
  }
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_SEARCH_VALUE: {
      const currentSearchTerm = action.payload;

      return {
        ...state,
        currentSearchTerm
      }
    }

    case SEARCH_FOR_USER: 
    case LOAD_TOP_USERS: {
      return {
        ...state,
        loading: true
      }
    }
    
    case SEARCH_FOR_USER_SUCCESS: 
    case LOAD_TOP_USERS_SUCCESS: {
      const users = action.payload;

      const ids = users.map(user => user.login);

      const data = users.reduce(
        (data, user) => {
          return {
            ...data,
            [user.login]: user
          };
        },
        {
          ...state.entities.data
        }
      );

      const entities = {
        ids,
        data
      }

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      }
    }

    case SEARCH_FOR_USER_FAIL:
    case LOAD_TOP_USERS_FAIL: {
      const message = action.payload;

      return {
        ...state,
        loading: false,
        loaded: true,
        message 
      }
    }

    case LOAD_USER_DETAILS_SUCCESS: {
      const user = action.payload;

      const data = {
        ...state.entities.data,
        [user.login]: {
          ...state.entities.data[user.login],
          ...user
        }
      }

      const entities = {
        ...state.entities,
        data
      }

      return {
        ...state,
        entities
      }
    }

    case LOAD_USER_REPOS_SUCCESS: {
      const {userLogin, repos} = action.payload;

      const _repos = repos.map(r => r.id);

      const data = {
        ...state.entities.data,
        [userLogin]: {
          ...state.entities.data[userLogin],
          repos: _repos
        }
      }

      const entities = {
        ...state.entities,
        data
      }

      return {
        ...state,
        entities
      }
    }
  }

  return state;
}

/*---------------------------------------
/ Selectors
----------------------------------------*/

export const getCurrentSearchTerm = (state) => {
  return state.currentSearchTerm;  
};

export const getUserEntities = (state) => {
  return state.entities;  
};

export const getUserData = (state) => {
  return getUserEntities(state).data;  
};

export const getUserDataByLogin = (state, userLogin) => {
  const userData = getUserData(state);
  return userData[userLogin] ? userData[userLogin] : {};  
};