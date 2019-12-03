import axios from 'axios';
import { fromJS, Map as iMap } from 'immutable';

import { api } from '../../../helpers';

// config
export const BASE_URL = '/ads/api/spaces/';

// Types
export const NAMESPACE = 'spaces';
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
  space: { name: '', x: '', y: '', application: '' },
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
        .set('space', iMap(action.payload));
    case DETAIL:
      return state.set('loading', false).set('space', iMap(action.payload));
    case FETCH:
      return state.set('loading', false).set('list', fromJS(action.payload));
    case UPDATE:
      return state.set('loading', false)
        .set('success', true)
        .set('space', iMap(action.payload));
    case REMOVE:
        return state.set('loading', false)
          .set('success', true)
          .set('list', state.get('list').filter((space) => space.id !== action.payload.id));
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
const spaceCreated = (space) => ({
  type: CREATE
})

const spacesReceived = (payload) => ({
  type: FETCH,
  payload
});

const spaceReceived = (space) => ({
  type: DETAIL,
  payload: space
})

const spaceUpdated = (space) => ({
  type: UPDATE,
  payload: space
});

const spaceRemoved = (id) => ({
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

  return axios.get(BASE_URL)
    .then(response => dispatch(spacesReceived(response.data)))
};

const fetch = (id) => dispatch => {
  dispatch(loading());

  return axios.get(`${BASE_URL}${id}/`)
    .then(response => dispatch(spaceReceived(response.data)));
}

const create = (space) => dispatch => {
  dispatch(loading());

  return axios.post(BASE_URL, space, api.getRequestConfig())
    .then(() => dispatch(spaceCreated(space)))
    .catch((e) => dispatch(handleError(e)));
}

const update = (id, space) => dispatch => {
  dispatch(loading());

  return axios.put(`${BASE_URL}${id}/`, space, api.getRequestConfig())
    .then(() => dispatch(spaceUpdated(space)))
    .catch((e) => dispatch(handleError(e)));
}

const remove = (id) => dispatch => {

  return axios.delete(`${BASE_URL}${id}/`, api.getRequestConfig())
    .then(() => dispatch(spaceRemoved(id)))
    .catch((e) => dispatch(handleError(e)));
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

const getSpace = state => {
  return state[NAMESPACE].get('space', iMap()).toJS();
};

const getList = state => {
  return state[NAMESPACE].get('list').toJS();
};

const hasError = state => {
  return state[NAMESPACE].get('error');
}

const success = state => {
  return state[NAMESPACE].get('success');
}

export const selectors = { isLoading, getSpace, getList, hasError, success };
