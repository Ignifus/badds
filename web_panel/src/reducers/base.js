export function baseData(state, action, section) {
  switch (action.type) {
    case section + '_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function baseIsLoading(state, action, section) {
  switch (action.type) {
    case section + '_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function baseLastUpdated(state, action, section) {
  switch (action.type) {
    case section + '_LAST_UPDATED':
      return action.lastUpdated;
    default:
      return state;
  }
}

export function baseHasErrored(state, action, section) {
  switch (action.type) {
    case section + '_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

let initialState = {
  site:{
    isLoading:true,
    hasErrored:""
  },
  dash:{
    isLoading:true,
    hasErrored:"",
    lastUpdated: Date.now()
  }
};

export function base(state = initialState, action) {
  // Check if section is present in the state.
  if (action.section !== undefined && state[action.section] === undefined)
    state[action.section] = {};

  let newState = Object.assign({}, state);

  // Copy section state.
  if (action.section !== undefined)
    newState[action.section] = Object.assign({}, state[action.section]);

  // Convenience variable
  let sectionState = newState[action.section];

  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      sectionState.data = action.data;
      return newState;
    case 'IS_LOADING':
      sectionState.isLoading = action.isLoading;
      return newState;
    case 'LAST_UPDATED':
      sectionState.lastUpdated = action.lastUpdated;
      return newState;
    case 'HAS_ERRORED':
      sectionState.hasErrored = action.hasErrored;
      return newState;
    default:
      return state;
  }
}
