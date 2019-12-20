import axios from 'axios';
import { fromJS, Map as iMap } from 'immutable';
import { createSelector } from 'reselect';

import { api } from '../../../helpers';
import { MainDuck } from 'layouts';

// config
export const BASE_URL = '/ads/api/resources/';

// Types
export const NAMESPACE = 'resources';
export const LOADING = `${NAMESPACE}/LOADING`;
export const FETCH = `${NAMESPACE}/FETCH`;
export const CREATE = `${NAMESPACE}/ADD`;
export const UPDATE = `${NAMESPACE}/UPDATE`;
export const REMOVE = `${NAMESPACE}/REMOVE`;
export const DETAIL = `${NAMESPACE}/DETAIL`;
export const ERROR = `${NAMESPACE}/ERROR`;
export const CLEAR_ERROR = `${NAMESPACE}/CLEARERROR`;
export const RESET = `${NAMESPACE}/RESET`;
export const RESTRICTION_ADDED = `${NAMESPACE}/RESTRICTION_ADDED`;

// Reducer
const emptyResource = { text: '', path: '', image: '' };
const initialState = fromJS({
  loading: false,
  resource: emptyResource,
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
        .set('resource', iMap(action.payload));
    case FETCH:
      return state.set('loading', false).set('list', fromJS(action.payload))
        .set('resource', iMap(emptyResource));
    case DETAIL:
        return state.set('loading', false).set('resource', fromJS(action.payload));
    case UPDATE:
      return state.set('loading', false)
        .set('success', true)
        .set('resource', iMap(action.payload));
    case REMOVE:
        return state.set('loading', false)
          .set('success', true)
          .set('list', state.get('list').filter((resource) => {
            return resource.get('id') !== action.payload
          }));
    case ERROR:
      return state.set('loading', false)
        .set('error', true);
    case CLEAR_ERROR:
      return state.set('error', false);
    case RESET:
      return initialState;
    case RESTRICTION_ADDED:
      return state.set('success', true)
        .set('loading', false)
        .set('error', false);
    default:
      return state;
  }
}

// Action Creators
const resourceCreated = (resource) => ({
  type: CREATE
})

const resourcesReceived = (payload) => ({
  type: FETCH,
  payload
});

const resourceReceived = (resource) => ({
  type: DETAIL,
  payload: resource
})

const resourceUpdated = (resource) => ({
  type: UPDATE,
  payload: resource
});

const resourceRemoved = (id) => ({
  type: REMOVE,
  payload: id
});

const clearError = () => ({
  type: CLEAR_ERROR,
});

const restrictionAdded = () => ({
  type: RESTRICTION_ADDED
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
    .then(response => {
      dispatch(resourcesReceived(response.data));
      dispatch(MainDuck.actions.listLoaded(response.data.length));
    });
};

const fetch = (id) => dispatch => {
  dispatch(loading());

  return axios.get(`${BASE_URL}${id}/`)
    .then(response => {
      dispatch(reset());
      dispatch(resourceReceived(response.data))
    });
}

const create = (resource) => dispatch => {
  dispatch(loading());

  return axios
    .post(BASE_URL, resource, api.getRequestConfig({
        'Content-Type': 'multipart/form-data'
      })
    )
    .then(() => dispatch(resourceCreated(resource)))
    .catch((e) => dispatch(handleError(e)));
}

const update = (id, resource) => dispatch => {
  dispatch(loading());

  return axios
    .put(`${BASE_URL}${id}/`, resource, api.getRequestConfig(
      {
        'Content-Type': 'multipart/form-data'
      })
    )
    .then(() => dispatch(resourceUpdated(resource)))
    .catch((e) => dispatch(handleError(e)));
}

const remove = (id) => dispatch => {

  return axios.delete(`${BASE_URL}${id}/`, api.getRequestConfig())
    .then(() => dispatch(resourceRemoved(id)))
    .catch((e) => dispatch(handleError(e)));
}

const addRestriction = (payload) => dispatch => {
  dispatch(loading());

  return axios.post('/ads/api/resourcerestriction/', payload, api.getRequestConfig())
    .then(() => dispatch(restrictionAdded()))
    .catch((e) => dispatch(handleError(e)))
}

export const actions = {
  loading,
  fetch,
  list,
  create,
  update,
  remove,
  reset,
  addRestriction
};

// Selectors

const isLoading = state => {
  return state[NAMESPACE].get('loading');
};

const getResource = state => {
  return state[NAMESPACE].get('resource', iMap()).toJS();
};

const getResources = state => {
  return state[NAMESPACE].get('list').toJS();
};

const getList = createSelector(
  [getResources, MainDuck.selectors.getPaginationData],
  (resources, paginationData) => {
    const {pageSize, page} = paginationData;
    return resources.slice(page * pageSize, (page + 1) * pageSize);
  }
)

const hasError = state => {
  return state[NAMESPACE].get('error');
}

const success = state => {
  return state[NAMESPACE].get('success');
}

export const selectors = { isLoading, getResource, getList, hasError, success };
