import {baseData, baseHasErrored, baseIsLoading, baseLastUpdated} from "./base";

const SECTION = "AGENCIES";

export function agenciesData(state = {}, action) {
  return baseData(state, action, SECTION);
}

export function agenciesIsLoading(state = true, action) {
  return baseIsLoading(state, action, SECTION);
}

export function agenciesLastUpdated(state = Date.now(), action) {
  return baseLastUpdated(state, action, SECTION);
}

export function agenciesHasErrored(state = "", action) {
  return baseHasErrored(state, action, SECTION);
}
