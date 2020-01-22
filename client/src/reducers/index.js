import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import hospitalReducer from "./hospitalReducer";
import doctorReducer from "./doctorReducer";
import bookingReducer from "./bookingReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  hospital: hospitalReducer,
  doctor: doctorReducer,
  booking: bookingReducer
});
