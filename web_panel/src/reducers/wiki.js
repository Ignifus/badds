import {baseData, baseHasErrored, baseIsLoading, baseLastUpdated} from "./base";

const SECTION = "WIKI";

export function wikiData(state = {}, action) {
  return baseData(state, action, SECTION);
}

export function wikiIsLoading(state = true, action) {
  return baseIsLoading(state, action, SECTION);
}

export function wikiLastUpdated(state = Date.now(), action) {
  return baseLastUpdated(state, action, SECTION);
}

export function wikiHasErrored(state = "", action) {
  return baseHasErrored(state, action, SECTION);
}
