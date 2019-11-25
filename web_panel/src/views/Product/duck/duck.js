import axios from 'axios';
import { fromJS } from 'immutable';

// Types
export const NAMESPACE = 'badds/apps';
export const LOADING = `${NAMESPACE}/LOADING`;
export const FETCH = `${NAMESPACE}/FETCH`;
export const CREATE = `${NAMESPACE}/ADD`;
export const UPDATE = `${NAMESPACE}/UPDATE`;
export const REMOVE = `${NAMESPACE}/REMOVE`;
export const DETAIL = `${NAMESPACE}/DETAIL`;

// Reducer
const initialState = fromJS({ type: CREATE });

export function reducer(state = initialState, action) {
  return state;
}

// Action Creators
export const appCreated = () => ({})

export const appsReceived = (payload) => ({
  type: FETCH,
  payload
});

export const appReceived = (app) => ({
  type: DETAIL,
  payload: app
})

export const appUpdated = (app) => ({
  type: UPDATE,
  payload: app
});

export const appRemoved = (id) => ({
  type: REMOVE,
  payload: id
});

export const loading = () => ({ type: LOADING });

// Side Effects
export const fetchApps = () => dispatch => {
  dispatch(loading());

  return axios.get('/api/applications')
    .then(apps => dispatch(appsReceived(apps)))
};

export const fetchApp = (id) => dispatch => {
  dispatch(loading);

  return axios.get(`/api/applications/${id}`)
    .then(app => dispatch(appReceived(app)));
}

export const createApp = (app) => dispatch => {
  console.log(app)
  return axios.post(`/ads/api/applications/`, app)
    .then(() => dispatch(appCreated()));
}

export const updateApp = (app) => dispatch => {

  return axios.post(`/api/applications`, app)
    .then(() => dispatch(appUpdated(app)));
}

export const removeApp = (id) => dispatch => {

  return axios.delete(`/api/applications/${id}`)
    .then(() => dispatch(appRemoved(id)));
}

// Selectors

// util TODO move to an lower layer

function getCSRFToken() {
  return document.cookie.split('=')[0]
}
