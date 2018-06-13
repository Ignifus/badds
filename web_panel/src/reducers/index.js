import { combineReducers } from 'redux';
import {siteData, siteHasErrored, siteIsLoading} from './site';
import {dashboardData, dashboardHasErrored, dashboardIsLoading, dashboardLastUpdated} from "./dashboard";
import {wikiData, wikiHasErrored, wikiIsLoading, wikiLastUpdated} from "./wiki";
import {agenciesData, agenciesHasErrored, agenciesIsLoading, agenciesLastUpdated} from "./agencies";
import {tokensData, tokensHasErrored, tokensIsLoading, tokensLastUpdated} from "./tokens";
import {base} from "./base";


export default combineReducers({
  base

  // siteData,
  // siteHasErrored,
  // siteIsLoading,
  //
  // dashboardData,
  // dashboardHasErrored,
  // dashboardLastUpdated,
  // dashboardIsLoading,
  //
  // wikiData,
  // wikiHasErrored,
  // wikiLastUpdated,
  // wikiIsLoading,
  //
  // agenciesData,
  // agenciesHasErrored,
  // agenciesLastUpdated,
  // agenciesIsLoading,
  //
  // tokensData,
  // tokensHasErrored,
  // tokensLastUpdated,
  // tokensIsLoading,
});
