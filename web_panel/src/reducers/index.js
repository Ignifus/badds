import { combineReducers } from 'redux';

let initialState = {
  site:{
    isLoading:true,
    hasErrored:""
  },
  dash:{
    isLoading:true,
    hasErrored:"",
    lastUpdated: Date.now()
  },
  apps:{
    isLoading:false,
    hasErrored:"",
    lastUpdated: Date.now()
  },
  ads:{
    isLoading:false,
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
      console.log(newState);
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

export default combineReducers({
  base
});
