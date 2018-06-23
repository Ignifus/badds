import axios from "axios";

export function putData(call, section, successCallback, failCallback) {
  return (dispatch) => {
    dispatch(baseHasErrored("", section));
    apiPut(dispatch, call, section, successCallback, failCallback);
  };
}

export function postData(call, section, successCallback, failCallback) {
  return (dispatch) => {
    dispatch(baseHasErrored("", section));
    apiPost(dispatch, call, section, successCallback, failCallback);
  };
}

export function fetchData(calls, section) {
  return (dispatch) => {
    dispatch(baseIsLoading(true, section));
    dispatch(baseHasErrored("", section));
    recursiveApiFetch(dispatch, calls, section);
  };
}

function apiPut(dispatch, call, section, successCallback, failCallback) {
  axios.put(call.url, call.data, {xsrfCookieName: "csrftoken", xsrfHeaderName: "X-CSRFToken"})
    .then(function (response) {
      if (response.status !== 200)
        throw Error(response.statusText);

      if (successCallback)
        successCallback();
    }).catch((error) => handleError(dispatch, error, section, failCallback));
}

function apiPost(dispatch, call, section, successCallback, failCallback) {
  axios.post(call.url, call.data, {xsrfCookieName: "csrftoken", xsrfHeaderName: "X-CSRFToken"})
    .then(function (response) {
      if (response.status !== 201)
        throw Error(response.statusText);

      if (successCallback)
        successCallback();
    }).catch((error) => handleError(dispatch, error, section, failCallback));
}

function recursiveApiFetch(dispatch, calls, section, prevState = {}) {
  axios.get(calls.url)
    .then(function (response) {
      if (response.status !== 200)
        throw Error(response.statusText);
      const state = prevState;
      state[calls.respKey] = response.data;

      if (calls.next) {
        recursiveApiFetch(dispatch, calls.next, section, state);
      }
      else {
        dispatch(baseFetchDataSuccess(state, section));
        dispatch(baseIsLoading(false, section));
        dispatch(baseLastUpdated(Date.now(), section));
      }
    }).catch((error) => handleError(dispatch, error, section));
}

function baseFetchDataSuccess(data, section) {
  return {
    type: 'FETCH_DATA_SUCCESS',
    section,
    data
  };
}

function baseIsLoading(bool, section) {
  return {
    type: 'IS_LOADING',
    section,
    isLoading: bool
  };
}

function baseLastUpdated(ts, section) {
  return {
    type: 'LAST_UPDATED',
    section,
    lastUpdated: ts
  };
}

function baseHasErrored(bool, section) {
  return {
    type: 'HAS_ERRORED',
    section,
    hasErrored: bool
  };
}

function handleError(dispatch, error, section, failCallback) {
  console.log(error);
  dispatch(baseHasErrored(error.message, section));

  if (failCallback)
    failCallback();
}
