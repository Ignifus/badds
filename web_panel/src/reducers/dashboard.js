import {baseData, baseHasErrored, baseIsLoading, baseLastUpdated} from "./base";

const SECTION = "DASHBOARD";

export function dashboardData(state = {}, action) {
  return baseData(state, action, SECTION);
}

export function dashboardIsLoading(state = true, action) {
  return baseIsLoading(state, action, SECTION);
}

export function dashboardLastUpdated(state = Date.now(), action) {
  return baseLastUpdated(state, action, SECTION);
}

export function dashboardHasErrored(state = "", action) {
  return baseHasErrored(state, action, SECTION);
}
