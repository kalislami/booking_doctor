import { GET_ERRORS, SET_CURRENT_USER, PORT } from "./types";
import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";

export const loginUser = userData => dispatch => {
  axios
    .post(PORT + "/api/user/login", userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;
      //Set token to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode  token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Log user out
export const logoutUser = () => dispatch => {
  //Remove token from localstorage
  localStorage.removeItem("jwtToken");
  //Remove auth header
  setAuthToken(false);
  //Set current use to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};