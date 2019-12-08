import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AppDuck } from './duck';
import { ProductDuck, SpaceDuck, AdvertisementDuck } from './views';

const rootReducer = combineReducers({
  [ProductDuck.NAMESPACE]: ProductDuck.reducer,
  [SpaceDuck.NAMESPACE]: SpaceDuck.reducer,
  [AppDuck.NAMESPACE]: AppDuck.reducer,
  [AdvertisementDuck.NAMESPACE]: AdvertisementDuck.reducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
