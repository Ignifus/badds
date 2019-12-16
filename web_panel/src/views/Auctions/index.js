import { actions, NAMESPACE, selectors, reducer } from './duck';

export const AuctionDuck = { actions, NAMESPACE, selectors, reducer };
export * from './AuctionsList';
export * from './AuctionsForm';
export * from './AuctionDetail';
export * from './Market';
