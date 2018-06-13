import {baseData, baseHasErrored, baseIsLoading} from "./base";

const SECTION = "SITE";

export function siteData(state = {}, action) {
  return baseData(state, action, SECTION);
}

export function siteIsLoading(state = true, action) {
  return baseIsLoading(state, action, SECTION);
}

export function siteHasErrored(state = "", action) {
  return baseHasErrored(state, action, SECTION);
}
