import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ProductDuck, SpaceDuck } from './views';

const rootReducer = combineReducers({
  apps: ProductDuck.reducer,
  spaces: SpaceDuck.reducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
