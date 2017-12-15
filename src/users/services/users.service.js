import { callApi } from "../../utils/apiUtils";
const API_ROOT = "https://api.github.com";

export const fetchTopUsers = (request, success, error) => {
  const url = `${API_ROOT}/search/users?q=followers:>1000&order=desc&per_page=10`;
  return callApi(
    url,
    null,
    request,
    success,
    error
  );
}

export const searchForUser = (query, request, success, error) => {
  const q = `${query}+${encodeURIComponent(`in:login`)}`;
  const url = `${API_ROOT}/search/users?q=${q}`;
  return callApi(
    url,
    null,
    request,
    success,
    error
  );
}

export const fetchUserDetails = (userLogin, request, success, error) => {
  const url = `${API_ROOT}/users/${userLogin}`;
  return callApi(
    url,
    null,
    request,
    success,
    error
  );
}

export const fetchUserRepos = (userLogin, request, success, error) => {
  const url = `${API_ROOT}/users/${userLogin}/repos`;
  return callApi(
    url,
    null,
    request,
    success,
    error
  );
}