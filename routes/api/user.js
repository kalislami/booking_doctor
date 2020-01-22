const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const bcrypt = require("bcryptjs");

const { check, validationResult } = require("express-validator");
const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

//LOAD MODEL
const User = require("../../models/User");

// @route   POST api/user/add
// @desc    Register User or Add New User
// @access  
router.post(
    "/add",
    [
        check("name", "Name field is required.")
        .not()
        .isEmpty(),
        check("username", "username field is required.")
        .not()
        .isEmpty(),
        check("password", "Password field is required.")
        .not()
        .isEmpty(),
        check(
        "password",
        "Password field must be 6 or more characters long."
        ).isLength({
        min: 6
        }),
        // check("confirm_password", "Confirm Password field is required.")
        //   .not()
        //   .isEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req).formatWith(errorFormatter);
            
            if (!errors.isEmpty()) {
                return res.json({ status: 400, success: false, errors: errors.mapped() });
            }

            const checkUser = await User.findOne({ username: req.body.username });
            if (checkUser) {
                return res.json({ status: 400, success: false, errors: {error: 'Username already exists'} });
            }

            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    const save = await newUser.save();
                    return res.json({ status: 200, success: true, data: save });
                });
            });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

// @route   POST api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post(
    "/login",
    [
        check("username", "username field is required.")
        .not()
        .isEmpty(),
        check("password", "Password field is required.")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req).formatWith(errorFormatter);
            
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.mapped());
            }

            const username = req.body.username;
            const password = req.body.password;

            const findUser = await User.findOne({ username });
            if (!findUser) {
              return res.status(400).json({username: "Username not found" });
            }

            bcrypt.compare(password, findUser.password).then(isMatch => {
            if (isMatch) {
      
              const payload = {
                // Create JWT Payload
                id: findUser.id,
                name: findUser.name,
                username: findUser.username
              };
      
              // Sign Token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 86400 * 7 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            } 
            else {
              return res.status(400).json({password: "Password incorrect" });
            }
          });

        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

module.exports = router;
