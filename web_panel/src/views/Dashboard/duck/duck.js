import axios from 'axios';
import { fromJS} from 'immutable';

// Types
export const NAMESPACE = 'analytics';
export const LOADING = `${NAMESPACE}/LOADING`;
export const FETCH_ADVERTISERS = `${NAMESPACE}/FETCH_ADVERTISERS`;
export const FETCH_PUBLISHERS = `${NAMESPACE}/FETCH_PUBLISHERS`;
export const ERROR = `${NAMESPACE}/ERROR`;
export const CLEAR_ERROR = `${NAMESPACE}/CLEARERROR`;


// Reducer
const initialState = fromJS({
  loading: false,
  analyticsAdvertiser: {},
  analyticsPublisher: {},
  error: false,
});

export function reducer(state = initialState, action) {
  switch(action.type) {
    case LOADING:
      return state.set('success', false)
        .set('error', false)
        .set('loading', true);
    case FETCH_ADVERTISERS:
      return state.set('loading', false).set('analyticsAdvertiser', fromJS(action.payload));
    case FETCH_PUBLISHERS:
      return state.set('loading', false).set('analyticsPublisher', fromJS(action.payload));
    case ERROR:
      return state.set('loading', false)
        .set('error', true);
    case CLEAR_ERROR:
      return state.set('error', false);
    default:
      return state;
  }
}

// Action Creators

const publishersAnalyticsReceived = (payload) => ({
  type: FETCH_PUBLISHERS,
  payload
});

const advertisersAnalyticsReceived = (payload) => ({
  type: FETCH_ADVERTISERS,
  payload
});

const clearError = () => ({
  type: CLEAR_ERROR,
});

// Public Actions
const loading = () => ({ type: LOADING });


const fetchAdvertiser = () => dispatch => {
  dispatch(loading());

  return axios.get('/ads/api/analytics-advertiser/')
    .then(response => dispatch(advertisersAnalyticsReceived(response.data)))
};

const fetchPublisher = () => dispatch => {
  dispatch(loading());

  return axios.get('/ads/api/analytics-publisher/')
    .then(response => dispatch(publishersAnalyticsReceived(response.data)))
};


export const actions = {
  loading,
  fetchAdvertiser,
  fetchPublisher,
};

// Selectors

const isLoading = state => {
  return state[NAMESPACE].get('loading');
};

const getAdvertiserAnalytics = state => {
  return state[NAMESPACE].get('analyticsAdvertiser').toJS();
};

const getPublishersAnalytics = state => {
  return state[NAMESPACE].get('analyticsPublisher').toJS();
};

const hasError = state => {
  return state[NAMESPACE].get('error');
}

const success = state => {
  return state[NAMESPACE].get('success');
}

export const selectors = {
  isLoading,
  getAdvertiserAnalytics,
  getPublishersAnalytics,
  hasError,
  success
};
