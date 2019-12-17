import axios from 'axios';
import { fromJS, Map as iMap } from 'immutable';
import { createSelector } from 'reselect';

import { api } from '../../../helpers';
import { MainDuck } from 'layouts';

// config
export const BASE_URL = '/ads/api/contracts/';

// Types
export const NAMESPACE = 'contracts';
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
  contract: { name: '', domain: '', description: '', category: '' },
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
        .set('contract', iMap(action.payload));
    case DETAIL:
      return state.set('loading', false).set('contract', iMap(action.payload));
    case FETCH:
      return state.set('loading', false).set('list', fromJS(action.payload));
    case UPDATE:
      return state.set('loading', false)
        .set('success', true)
        .set('contract', iMap(action.payload));
    case REMOVE:
        return state.set('loading', false)
          .set('list', state.get('list').filter((contract) => contract.id !== action.payload.id));
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
const contractCreated = (contract) => ({
  type: CREATE
})

const contractsReceived = (payload) => ({
  type: FETCH,
  payload
});

const contractReceived = (contract) => ({
  type: DETAIL,
  payload: contract
})

const contractUpdated = (contract) => ({
  type: UPDATE,
  payload: contract
});

const contractRemoved = (id) => ({
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
    .then(response => {
      dispatch(contractsReceived(response.data));
      dispatch(MainDuck.actions.listLoaded(response.data.length));
    });
};

const fetch = (id) => dispatch => {
  dispatch(loading());

  return axios.get(`${BASE_URL}${id}/`)
    .then(response => dispatch(contractReceived(response.data)));
}

const create = (contract) => dispatch => {
  dispatch(loading());

  return axios.post(BASE_URL, contract, api.getRequestConfig())
    .then(() => dispatch(contractCreated(contract)))
    .catch((e) => dispatch(handleError(e)));
}

const update = (id, contract) => dispatch => {
  dispatch(loading());

  return axios.put(`${BASE_URL}${id}/`, contract, api.getRequestConfig())
    .then(() => dispatch(contractUpdated(contract)))
    .catch((e) => dispatch(handleError(e)));
}

const remove = (id) => dispatch => {

  return axios.delete(`${BASE_URL}${id}/`, api.getRequestConfig())
    .then(() => dispatch(contractRemoved(id)))
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

const getContract = state => {
  return state[NAMESPACE].get('contract', iMap()).toJS();
};

const getContracts = state => {
  return state[NAMESPACE].get('list').toJS();
};

const getList = createSelector(
  [getContracts, MainDuck.selectors.getPaginationData],
  (contracts, paginationData) => {
    const {pageSize, page} = paginationData;
    return contracts.slice(page * pageSize, (page + 1) * pageSize);
  }
)

const hasError = state => {
  return state[NAMESPACE].get('error');
}

const success = state => {
  return state[NAMESPACE].get('success');
}

export const selectors = { isLoading, getContract, getList, hasError, success };
