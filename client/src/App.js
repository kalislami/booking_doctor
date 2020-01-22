import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Home from "./pages/Dashboard/index";
import Login from "./pages/Login/index";
import HospitalList from "./pages/Hospital/list";
import SpecialtyList from "./pages/Doctor/specialty";
import DoctorSpecialtyList from "./pages/Doctor/list-by-specialty";
import DoctorList from "./pages/Doctor/list";
import Schedule from "./pages/Booking/list";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/hospital" component={HospitalList} />
            <Route exact path="/specialty" component={SpecialtyList} />
            <Route exact path="/specialty/doctor" component={DoctorSpecialtyList} />
            <Route exact path="/all-doctor" component={DoctorList} />
            <Route exact path="/schedule" component={Schedule} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
