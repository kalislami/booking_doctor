import axios from "axios";
import {
  GET_ERRORS,
  BOOKING_DOCTOR,
  BOOKING_LOADED,
  BOOKING_LOADING,
  PORT
} from "./types";

export const bookingDoctor = (data) => dispatch => {
    axios
        .post(PORT + "/api/booking", data)
        .then(res =>
            dispatch({
                type: BOOKING_DOCTOR,
                payload: res.data
            })
        )
        .catch(err =>
            // console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const getAllBooking = () => dispatch => {
    dispatch(setDataLoading());
    axios
        .get(PORT + "/api/booking/list")
        .then(res =>
            dispatch({
                type: BOOKING_LOADED,
                payload: res.data
            })
        )
        .catch(err =>
            // console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setDataLoading = () => {
  return {
    type: BOOKING_LOADING
  };
};