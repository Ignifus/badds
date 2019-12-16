import { createSelector } from 'reselect';
import { fromJS, Map as iMap } from 'immutable';


// Types
export const NAMESPACE = 'main';
export const LIST_LOADED = `${NAMESPACE}/LIST_LOADED`;
export const PREV = `${NAMESPACE}/PREV`;
export const NEXT = `${NAMESPACE}/NEXT`;
export const RESET = `${NAMESPACE}/RESET`;

// Reducer
const initialState = fromJS({
  page_size: 5,
  page: 0,
  count: 0,
});

export function reducer(state = initialState, action) {
  switch(action.type) {
    case LIST_LOADED:
      return state.set('page', 0)
        .set('count', action.payload);
    case PREV:
      return prevPage(state);
    case NEXT:
      return nextPage(state);
    case RESET:
      return initialState;
    default:
      return state;
  }
}

const prevPage = (state) => {
  const page = state.get('page');
  if (page <= 0) {
    return state;
  }
  return state.set('page', page - 1);
}

const nextPage = (state) => {
  const page = state.get('page');
  const size = state.get('page_size');
  const count = state.get('count');
  if ((page * size) + size >= count) {
    return state;
  }
  return state.set('page', page + 1);
}

// Action Creators
const listLoaded = (payload) => {
  return ({ type: LIST_LOADED, payload })
};

const reset = () => ({
  type: RESET
});

const next = () => ({
  type: NEXT
});

const prev = () => ({
  type: PREV
})

export const actions = { listLoaded, reset, next, prev };

// Selectors

const isLoading = state => {
  return state[NAMESPACE].get('loading');
};

const getCount = state => {
  return state[NAMESPACE].get('count');
};

const getPageSize = state => {
  return state[NAMESPACE].get('page_size');
};

const getPage = state => {
  return state[NAMESPACE].get('page');
}

const getPaginationData = createSelector(
  [getPageSize, getPage, getCount],
  (pageSize, page, count) => {
    const resultsPortion = `${page * pageSize} - ${(page + 1) * pageSize}`;
    return {pageSize, page, count, resultsPortion}
  }
)

export const selectors = { isLoading, getPageSize, getPage, getPaginationData };
