import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AppDuck } from './duck';
import { ProductDuck, SpaceDuck } from './views';

const rootReducer = combineReducers({
  [ProductDuck.NAMESPACE]: ProductDuck.reducer,
  [SpaceDuck.NAMESPACE]: SpaceDuck.reducer,
  [AppDuck.NAMESPACE]: AppDuck.reducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
