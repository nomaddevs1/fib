import { FECTH_INDEXES, FETCH_VALUES } from "../actions/types";

const initialState = {
  seenIndex: [],
  values: {},
};
export const fibinanciReducers = (state = initialState, action) => {
  switch (action.type) {
    case FECTH_INDEXES:
      return { ...state, seenIndex: action.payload };
    case FETCH_VALUES:
      return { ...state, values: action.payload };
    default:
      return state;
  }
};
