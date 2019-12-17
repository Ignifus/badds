import axios from 'axios';
import { fromJS, Map as iMap } from 'immutable';
import { createSelector } from 'reselect';

import { api } from '../../../helpers';
import { MainDuck } from 'layouts';

// config
export const BASE_URL = '/ads/api/auctions/';

// Types
export const NAMESPACE = 'auctions';
export const LOADING = `${NAMESPACE}/LOADING`;
export const FETCH = `${NAMESPACE}/FETCH`;
export const FETCH_ALL = `${NAMESPACE}/FETCH_ALL`;
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
  auction: {
    space: '',
    end_date: '',
    prints: '',
    status: '',
    contract_duration_days: '',
    created_at: ''
  },
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
        .set('auction', iMap(action.payload));
    case DETAIL:
      return state.set('loading', false).set('auction', iMap(action.payload));
    case FETCH:
      return state.set('loading', false).set('list', fromJS(action.payload));
    case FETCH_ALL:
        return state.set('loading', false).set('list', fromJS(action.payload));
    case UPDATE:
      return state.set('loading', false)
        .set('success', true)
        .set('auction', iMap(action.payload));
    case REMOVE:
        return state.set('loading', false)
          .set('success', true)
          .set('list', state.get('list').filter((auction) => auction.id !== action.payload.id));
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
const auctionCreated = (auction) => ({
  type: CREATE
})

const auctionsReceived = (payload) => ({
  type: FETCH,
  payload
});

const allAuctionsReceived = (payload) => ({
  type: FETCH_ALL,
  payload
});

const auctionReceived = (auction) => ({
  type: DETAIL,
  payload: auction
})

const auctionUpdated = (auction) => ({
  type: UPDATE,
  payload: auction
});

const auctionRemoved = (id) => ({
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
      dispatch(auctionsReceived(response.data));
      dispatch(MainDuck.actions.listLoaded(response.data.length));
    });
};

const fetch = (id) => dispatch => {
  dispatch(loading());

  return axios.get(`${BASE_URL}${id}/`)
    .then(response => dispatch(auctionReceived(response.data)));
}

const create = (auction) => dispatch => {
  dispatch(loading());

  return axios.post(BASE_URL, auction, api.getRequestConfig())
    .then(() => dispatch(auctionCreated(auction)))
    .catch((e) => dispatch(handleError(e)));
}

const update = (id, auction) => dispatch => {
  dispatch(loading());

  return axios.put(`${BASE_URL}${id}/`, auction, api.getRequestConfig())
    .then(() => dispatch(auctionUpdated(auction)))
    .catch((e) => dispatch(handleError(e)));
}

const remove = (id) => dispatch => {

  return axios.delete(`${BASE_URL}${id}/`, api.getRequestConfig())
    .then(() => dispatch(auctionRemoved(id)))
    .catch((e) => dispatch(handleError(e)));
}

const listAll = () => dispatch => {
  dispatch(loading());

  return axios.get(`/ads/api/all-auctions/`)
    .then((response) => dispatch(allAuctionsReceived(response.data)))
    .catch((e) => handleError(e));
}

export const actions = {
  loading,
  fetch,
  list,
  listAll,
  create,
  update,
  remove,
  reset,
};

// Selectors

const isLoading = state => {
  return state[NAMESPACE].get('loading');
};

const getAuction = state => {
  return state[NAMESPACE].get('auction', iMap()).toJS();
};

const getAuctions = state => {
  return state[NAMESPACE].get('list').toJS();
};

const getList = createSelector(
  [getAuctions, MainDuck.selectors.getPaginationData],
  (auctions, paginationData) => {
    const {pageSize, page} = paginationData;
    return auctions.slice(page * pageSize, (page + 1) * pageSize);
  }
)

const hasError = state => {
  return state[NAMESPACE].get('error');
};

const success = state => {
  return state[NAMESPACE].get('success');
};

const getAuctionById = (state, props) => {
  return state[NAMESPACE].get('list').toJS()
    .filter(auction => auction.id == props.match.params.auctionId)[0];
}

export const selectors = { isLoading, getAuction, getList, hasError, success, getAuctionById };
