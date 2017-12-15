import {
  LOAD_USER_REPOS,
  LOAD_USER_REPOS_SUCCESS,
  LOAD_USER_REPOS_FAIL
} from '../actions/users.actions';

import { getUserDataByLogin } from './users.reducer';
import { getActiveUserDetails } from './user-details.reducer';

const initialState = {
  loading: false,
  loaded: false,
  error: '',
  entities: {
    ids: [],  // array of repo ids
    data: {} //{id: repo}
  }
};

export const repos = (state = initialState, action) => {
  switch (action.type) {
     
    case LOAD_USER_REPOS: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }
    
    case LOAD_USER_REPOS_SUCCESS: {
      const {repos} = action.payload;

      const ids = repos.map(repo => repo.id);

      const data = repos.reduce(
        (data, repo) => {
          return {
            ...data,
            [repo.id]: repo
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
        entities,
        error: ''
      }
    }

    case LOAD_USER_REPOS_FAIL: {
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

export const getReposForActiveUser = (state, userLogin) => {
  const {users, repos} = state;
  const {entities} = repos;
  const {data} = entities;
  const activeUserDetails = getActiveUserDetails(users, userLogin);
  return activeUserDetails.repos
  ? activeUserDetails.repos.map(repoId => data[repoId])
  : [];
}