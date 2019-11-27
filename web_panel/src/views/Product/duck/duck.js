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
export const CLEAR_ERROR = `${NAMESPACE}/CLEARERROR`;
export const RESET = `${NAMESPACE}/RESET`;

// Reducer
const initialState = fromJS({
  loading: false,
  app: null,
  list: [],
  error: false
});

export function reducer(state = initialState, action) {
  switch(action.type) {
    case LOADING:
      return state.set('success', false)
        .set('error', false)
        .set('loading', true);
    case CREATE:
      return state.set('loading', false)
        .set('success', true)
        .set('app', iMap(action.payload));
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
      return state.set('loading', false)
        .set('error', true);
    case CLEAR_ERROR:
      return state.set('error', false);
    case RESET:
      return state.set('success', false)
        .set('error', false)
        .set('loading', false);
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

const clearError = () => ({
  type: CLEAR_ERROR,
});

// Public Actions
const loading = () => ({ type: LOADING });

const reset = () => ({
  type: RESET
});

const handleError = (e) => dispatch => {
  dispatch({
    type: ERROR,
    payload: 'something happened'
  });
  setTimeout(() => dispatch(clearError()), 5000); // TODO fix, resetear on loading
}
const list = () => dispatch => {
  dispatch(loading());

  return axios.get('/api/applications')
    .then(apps => dispatch(appsReceived(apps)))
};

const fetch = (id) => dispatch => {
  dispatch(loading());

  return axios.get(`/api/applications/${id}`)
    .then(app => dispatch(appReceived(app)));
}

const create = (app) => dispatch => {
  dispatch(loading());

  return axios.post(`/ads/api/applications/`, app, api.getRequestConfig())
    .then(() => dispatch(appCreated(app)))
    .catch((e) => dispatch(handleError(e)));
}

const update = (app) => dispatch => {
  dispatch(loading());

  return axios.post(`/api/applications`, app)
    .then(() => dispatch(appUpdated(app)));
}

const remove = (id) => dispatch => {

  return axios.delete(`/api/applications/${id}`)
    .then(() => dispatch(appRemoved(id)));
}

export const actions = {
  loading,
  fetch,
  list,
  create,
  update,
  remove,
  reset
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

const success = state => {
  return state[NAMESPACE].get('success');
}

export const selectors = { isLoading, getApp, hasError, success };
