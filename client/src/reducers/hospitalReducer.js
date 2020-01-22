import { HOSPITAL_LIST_LOADED, HOSPITAL_LIST_LOADING } from "../actions/types";

const initialState = {
  data: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HOSPITAL_LIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case HOSPITAL_LIST_LOADED:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
