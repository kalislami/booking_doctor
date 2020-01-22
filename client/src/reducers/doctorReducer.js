import { 
    SPECIALTY_DOCTOR_LIST_LOADED,
    SPECIALTY_DOCTOR_LIST_LOADING,
    SPECIALTY_LIST_LOADED,
    SPECIALTY_LIST_LOADING,
    DOCTOR_LIST_LOADED,
    DOCTOR_LIST_LOADING
} from "../actions/types";

const initialState = {
  specialty: null,
  doctor: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SPECIALTY_LIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case SPECIALTY_LIST_LOADED:
      return {
        ...state,
        specialty: action.payload,
        loading: false
      };
    case SPECIALTY_DOCTOR_LIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case SPECIALTY_DOCTOR_LIST_LOADED:
      return {
        ...state,
        doctor: action.payload,
        loading: false
      };
    case DOCTOR_LIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case DOCTOR_LIST_LOADED:
      return {
        ...state,
        doctor: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
