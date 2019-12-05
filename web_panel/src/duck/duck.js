import axios from 'axios';
import { fromJS } from 'immutable';

export const BASE_URL = '/ads/api/';

// types

export const NAMESPACE = 'config';
const FETCH_RESTRICTIONS = `${NAMESPACE}/FETCH_RESTRICTIONS`;

// reducer
const initialState = fromJS({
  restrictions: []
});

export function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_RESTRICTIONS:
      return state.set('restrictions', fromJS(action.payload || {}));
    default:
      return state;
  }
}

// actions
const restrictionsReceived = (payload) => ({
  type: FETCH_RESTRICTIONS,
  payload
});

// public actions

const fetchRestrictions = () => (dispatch) => {
  return axios.get(`${BASE_URL}restriction/`)
    .then((response) => dispatch(restrictionsReceived(response.data)));
}

export const actions = { fetchRestrictions };

// selectors

export const getRestrictions = state => {
  return state[NAMESPACE].get('restrictions').toJS();
}

export const selectors = { getRestrictions };
