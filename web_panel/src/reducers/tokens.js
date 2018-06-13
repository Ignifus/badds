import {baseData, baseHasErrored, baseIsLoading, baseLastUpdated} from "./base";

const SECTION = "TOKENS";

export function tokensData(state = {}, action) {
  return baseData(state, action, SECTION);
}

export function tokensIsLoading(state = true, action) {
  return baseIsLoading(state, action, SECTION);
}

export function tokensLastUpdated(state = Date.now(), action) {
  return baseLastUpdated(state, action, SECTION);
}

export function tokensHasErrored(state = "", action) {
  return baseHasErrored(state, action, SECTION);
}
