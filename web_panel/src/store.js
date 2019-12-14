import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AppDuck } from './duck';
import {
  AuctionDuck,
  ProductDuck,
  SpaceDuck,
  AdvertisementDuck,
  ResourcesDuck,
  BiddingsDuck
} from './views';

const rootReducer = combineReducers({
  [ProductDuck.NAMESPACE]: ProductDuck.reducer,
  [SpaceDuck.NAMESPACE]: SpaceDuck.reducer,
  [AppDuck.NAMESPACE]: AppDuck.reducer,
  [AdvertisementDuck.NAMESPACE]: AdvertisementDuck.reducer,
  [ResourcesDuck.NAMESPACE]: ResourcesDuck.reducer,
  [AuctionDuck.NAMESPACE]: AuctionDuck.reducer,
  [BiddingsDuck.NAMESPACE]: BiddingsDuck.reducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
