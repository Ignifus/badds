import { actions, NAMESPACE, selectors, reducer } from './duck';

export const SpaceDuck = { actions, NAMESPACE, selectors, reducer };
export * from './SpacesList';
export * from './SpacesForm';
export * from './SpacesRestrictions';
export * from './SpaceDetail';
