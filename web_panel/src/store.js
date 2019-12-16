import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AppDuck } from './duck';
import {
  AuctionDuck,
  ProductDuck,
  SpaceDuck,
  AdvertisementDuck,
  ResourcesDuck,
  BiddingsDuck,
  AnalyticsDuck,
  ContractDuck,
} from './views';
import { MainDuck } from 'layouts';

const rootReducer = combineReducers({
  [ProductDuck.NAMESPACE]: ProductDuck.reducer,
  [SpaceDuck.NAMESPACE]: SpaceDuck.reducer,
  [AppDuck.NAMESPACE]: AppDuck.reducer,
  [AdvertisementDuck.NAMESPACE]: AdvertisementDuck.reducer,
  [ResourcesDuck.NAMESPACE]: ResourcesDuck.reducer,
  [AuctionDuck.NAMESPACE]: AuctionDuck.reducer,
  [BiddingsDuck.NAMESPACE]: BiddingsDuck.reducer,
  [AnalyticsDuck.NAMESPACE]: AnalyticsDuck.reducer,
  [ContractDuck.NAMESPACE]: ContractDuck.reducer,
  [MainDuck.NAMESPACE]: MainDuck.reducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
