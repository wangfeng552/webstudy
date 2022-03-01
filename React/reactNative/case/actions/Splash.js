import * as types from './ActionTypes';

export function addCount(count) {
  return {
    type: types.SPLASH_ADD_COUNT,
    count: count,
  };
}
