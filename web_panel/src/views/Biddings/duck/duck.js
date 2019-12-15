import axios from 'axios';
import { fromJS, Map as iMap } from 'immutable';

import { api } from '../../../helpers';

// config
export const BASE_URL = '/ads/api/biddings/';

// Types
export const NAMESPACE = 'biddings';
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
  bidding: { name: '', domain: '', description: '', category: '' },
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
        .set('bidding', iMap(action.payload));
    case DETAIL:
      return state.set('loading', false).set('bidding', iMap(action.payload));
    case FETCH:
      return state.set('loading', false).set('list', fromJS(action.payload));
    case UPDATE:
      return state.set('loading', false)
        .set('success', true)
        .set('bidding', iMap(action.payload));
    case REMOVE:
        return state.set('loading', false)
          .set('list', state.get('list').filter((bidding) => bidding.id !== action.payload.id));
    case ERROR:
      return state.set('loading', false)
        .set('error', action.payload);
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
const biddingCreated = (bidding) => ({
  type: CREATE
})

const biddingsReceived = (payload) => ({
  type: FETCH,
  payload
});

const biddingReceived = (bidding) => ({
  type: DETAIL,
  payload: bidding
})

const biddingUpdated = (bidding) => ({
  type: UPDATE,
  payload: bidding
});

const biddingRemoved = (id) => ({
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
    payload: e.response.data[0]
  });
  setTimeout(() => dispatch(clearError()), 5000); // TODO fix, resetear on loading
}

const list = () => dispatch => {
  dispatch(loading());

  return axios.get(BASE_URL)
    .then(response => dispatch(biddingsReceived(response.data)))
};

const fetch = (id) => dispatch => {
  dispatch(loading());

  return axios.get(`${BASE_URL}${id}/`)
    .then(response => dispatch(biddingReceived(response.data)));
}

const create = (bidding) => dispatch => {
  dispatch(loading());

  return axios.post(BASE_URL, bidding, api.getRequestConfig())
    .then(() => dispatch(biddingCreated(bidding)))
    .catch((e) => dispatch(handleError(e)));
}

const update = (id, bidding) => dispatch => {
  dispatch(loading());

  return axios.put(`${BASE_URL}${id}/`, bidding, api.getRequestConfig())
    .then(() => dispatch(biddingUpdated(bidding)))
    .catch((e) => dispatch(handleError(e)));
}

const remove = (id) => dispatch => {

  return axios.delete(`${BASE_URL}${id}/`, api.getRequestConfig())
    .then(() => dispatch(biddingRemoved(id)))
    .then(() => dispatch(getList()))
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

const getBidding = state => {
  return state[NAMESPACE].get('bidding', iMap()).toJS();
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

export const selectors = { isLoading, getBidding, getList, hasError, success };
