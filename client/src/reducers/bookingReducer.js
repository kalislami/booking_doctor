import { 
    BOOKING_DOCTOR,
    BOOKING_LOADED,
    BOOKING_LOADING
} from "../actions/types";

const initialState = {
  list: null,
  booking: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BOOKING_LOADING:
      return {
        ...state,
        loading: true
      };
    case BOOKING_LOADED:
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    case BOOKING_DOCTOR:
      return {
        ...state,
        booking: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
