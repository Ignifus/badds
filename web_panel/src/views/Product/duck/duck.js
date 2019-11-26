import axios from 'axios';
import { fromJS, Map as iMap } from 'immutable';

import { api } from '../../../helpers';

// Types
export const NAMESPACE = 'apps';
export const LOADING = `${NAMESPACE}/LOADING`;
export const FETCH = `${NAMESPACE}/FETCH`;
export const CREATE = `${NAMESPACE}/ADD`;
export const UPDATE = `${NAMESPACE}/UPDATE`;
export const REMOVE = `${NAMESPACE}/REMOVE`;
export const DETAIL = `${NAMESPACE}/DETAIL`;
export const ERROR = `${NAMESPACE}/ERROR`;
export const RESET = `${NAMESPACE}/RESET`;

// Reducer
const initialState = fromJS({ loading: false, app: null, list: [], error: false });

export function reducer(state = initialState, action) {
  switch(action.type) {
    case LOADING:
      console.log('loading');
      return state.set('loading', true).set('error', false);
    case CREATE:
      console.log('create');
      return state.set('loading', false).set('app', iMap(action.payload));
    case DETAIL:
      return state.set('loading', false).set('app', iMap(action.payload));
    case FETCH:
      return state.set('loading', false).set('list', fromJS(action.payload));
    case UPDATE:
      return state.set('loading', false).set('app', iMap(action.payload));
    case REMOVE:
        return state.set('loading', false)
          .set('apps', state.get('apps').filter((app) => app.id !== action.payload.id));
    case ERROR:
        console.log('error');
      return state.set('error', true);
    case RESET:
      return initialState;
    default:
      return state;
  }
}

// Action Creators
const appCreated = (app) => ({
  type: CREATE
})

const appsReceived = (payload) => ({
  type: FETCH,
  payload
});

const appReceived = (app) => ({
  type: DETAIL,
  payload: app
})

const appUpdated = (app) => ({
  type: UPDATE,
  payload: app
});

const appRemoved = (id) => ({
  type: REMOVE,
  payload: id
});

const handleError = (e) => ({
  type: ERROR,
  payload: 'something happened'
})


// Public Actions
const loading = () => ({ type: LOADING });

const fetchApps = () => dispatch => {
  dispatch(loading());

  return axios.get('/api/applications')
    .then(apps => dispatch(appsReceived(apps)))
};

const fetchApp = (id) => dispatch => {
  dispatch(loading());

  return axios.get(`/api/applications/${id}`)
    .then(app => dispatch(appReceived(app)));
}

const createApp = (app) => dispatch => {
  dispatch(loading());

  return axios.post(`/ads/api/applications/`, app, api.getRequestConfig())
    .then(() => dispatch(appCreated(app)))
    .finally((e) => dispatch(handleError(e)));
}

const updateApp = (app) => dispatch => {
  dispatch(loading());

  return axios.post(`/api/applications`, app)
    .then(() => dispatch(appUpdated(app)));
}

const removeApp = (id) => dispatch => {

  return axios.delete(`/api/applications/${id}`)
    .then(() => dispatch(appRemoved(id)));
}

export const actions = {
  loading,
  fetchApp,
  fetchApps,
  createApp,
  updateApp,
  removeApp
};

// Selectors

const isLoading = state => {
  return state[NAMESPACE].get('loading');
};

const getApp = state => {
  return state[NAMESPACE].get('app').toJS();
};

const hasError = state => {
  return state[NAMESPACE].get('error');
}

export const selectors = { isLoading, getApp, hasError };
