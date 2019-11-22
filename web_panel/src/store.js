import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ProductDuck } from './views';

const rootReducer = combineReducers({
  apps: ProductDuck.reducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
