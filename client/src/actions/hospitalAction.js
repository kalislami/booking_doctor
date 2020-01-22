import axios from "axios";
import {
  GET_ERRORS,
  HOSPITAL_LIST_LOADED,
  HOSPITAL_LIST_LOADING,
  PORT
} from "./types";

export const getHospitalList = () => dispatch => {
    dispatch(setGetDataLoading());
    axios
        .get(PORT + "/api/hospital/list")
        .then(res =>
            dispatch({
                type: HOSPITAL_LIST_LOADED,
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

export const setGetDataLoading = () => {
  return {
    type: HOSPITAL_LIST_LOADING
  };
};
