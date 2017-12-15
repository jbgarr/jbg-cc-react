import { getCurrentSearchTerm } from '../reducers';
import * as fromService from '../../services';

// action constants
export const UPDATE_USER_SEARCH_VALUE = '[Users] Update User Search Value';

export const SEARCH_FOR_USER = '[Users] Search For User';
export const SEARCH_FOR_USER_SUCCESS = '[Users] Search For User Success';
export const SEARCH_FOR_USER_FAIL = '[Users] Search For User Fail';

export const LOAD_TOP_USERS = '[Users] Load Top Users';
export const LOAD_TOP_USERS_SUCCESS = '[Users] Load Top Users Success';
export const LOAD_TOP_USERS_FAIL = '[Users] Load Top Users Fail';

export const LOAD_USER_DETAILS = '[Users] Load User Details';
export const LOAD_USER_DETAILS_SUCCESS = '[Users] Load User Details Success';
export const LOAD_USER_DETAILS_FAIL = '[Users] Load User Details Fail';

export const LOAD_USER_REPOS = '[Users] Load User Repos';
export const LOAD_USER_REPOS_SUCCESS = '[Users] Load User Repos Success';
export const LOAD_USER_REPOS_FAIL = '[Users] Load User Repos Fail';

// action creators
export const updateUserSearchValue = (query) => ({type: UPDATE_USER_SEARCH_VALUE, payload: query});


export const performSearchForUser = () => {
  return (dispatch, getState) => {
    const query = getCurrentSearchTerm(getState().users);
    return fromService.searchForUser(
      query,
      searchForUser,
      searchForUserSuccess,
      searchForUserFail
    )(dispatch);
  }
};
export const searchForUser = () => ({type: SEARCH_FOR_USER});
export const searchForUserSuccess = (response) => {
  const users = response.items;
  return {type: SEARCH_FOR_USER_SUCCESS, payload: users};  
};
export const searchForUserFail = (error) => ({type: SEARCH_FOR_USER_FAIL, payload: error});


export const performLoadTopUsers = () => {
  return (dispatch) => {
    return fromService.fetchTopUsers(
      loadTopUsers,
      loadTopUsersSuccess,
      loadTopUsersFail
    )(dispatch);
  }
};
export const loadTopUsers = () => ({type: LOAD_TOP_USERS});
export const loadTopUsersSuccess = (response) => {
  const users = response.items;
  return {type: LOAD_TOP_USERS_SUCCESS, payload: users}  
};
export const loadTopUsersFail = (error) => ({type: LOAD_TOP_USERS, payload: error});


export const performLoadUserDetails = (userLogin) => {
  return (dispatch, getState) => {
    const loading = getState().userDetails.loading;
    if (loading) return;
    return fromService.fetchUserDetails(
      userLogin,
      loadUserDetails,
      loadUserDetailsSuccess,
      loadUserDetailsFail
    )(dispatch);
  }
};
export const loadUserDetails = () => ({type: LOAD_USER_DETAILS});
export const loadUserDetailsSuccess = (user) => {
  return {type: LOAD_USER_DETAILS_SUCCESS, payload: user}  
};
export const loadUserDetailsFail = (error) => {
  return {type: LOAD_USER_DETAILS_FAIL, payload: error.message || error.statusText}  
};


export const performLoadUserRepos = (userLogin) => {
  return (dispatch) => {
    return fromService.fetchUserRepos(
      userLogin,
      loadUserRepos,
      loadUserReposSuccess.bind(null, userLogin),
      loadUserReposFail
    )(dispatch);
  }
};
export const loadUserRepos = () => ({type: LOAD_USER_REPOS});
export const loadUserReposSuccess = (userLogin, repos) => {
  return {type: LOAD_USER_REPOS_SUCCESS, payload: {userLogin, repos}}  
};
export const loadUserReposFail = (error) => {
  return {type: LOAD_USER_REPOS_FAIL, payload: error.message || error.statusText}  
};
