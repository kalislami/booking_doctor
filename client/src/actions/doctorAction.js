import axios from "axios";
import {
  GET_ERRORS,
  SPECIALTY_LIST_LOADED,
  SPECIALTY_LIST_LOADING,
  SPECIALTY_DOCTOR_LIST_LOADED,
  SPECIALTY_DOCTOR_LIST_LOADING,
  DOCTOR_LIST_LOADED,
  DOCTOR_LIST_LOADING,
  PORT
} from "./types";

export const getSpecialtyList = () => dispatch => {
    dispatch(setGSLLoading());
    axios
        .get(PORT + "/api/doctor/specialty/list")
        .then(res =>
            dispatch({
                type: SPECIALTY_LIST_LOADED,
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

export const getDoctorBySpecialty = (specialtyID) => dispatch => {
    dispatch(setDBSLoading());
    axios
        .get(PORT + "/api/doctor/list/" + specialtyID)
        .then(res =>
            dispatch({
                type: SPECIALTY_DOCTOR_LIST_LOADED,
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

export const getAllDoctor = () => dispatch => {
    dispatch(setDoctorLoading());
    axios
        .get(PORT + "/api/doctor/list")
        .then(res =>
            dispatch({
                type: DOCTOR_LIST_LOADED,
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

export const setGSLLoading = () => {
  return {
    type: SPECIALTY_LIST_LOADING
  };
};

export const setDBSLoading = () => {
    return {
      type: SPECIALTY_DOCTOR_LIST_LOADING
    };
};

export const setDoctorLoading = () => {
    return {
      type: DOCTOR_LIST_LOADING
    };
};
