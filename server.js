const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const routeUser = require("./routes/api/user");
const routeBooking = require("./routes/api/booking");
const routeDoctor = require("./routes/api/doctor");
const routeHospital = require("./routes/api/hospital");

const app = express();

//BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  }
  next();
});

//DB CONFIG
const db = require("./config/keys").mongoURI;

//CONNECT TO MONGODB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
//passport config
require("./config/passport.js")(passport);

//use ROUTES
app.use("/api/user", routeUser);
app.use("/api/booking", routeBooking);
app.use("/api/doctor", routeDoctor);
app.use("/api/hospital", routeHospital);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));