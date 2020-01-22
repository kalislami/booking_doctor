const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");
// const passport = require("passport");

const { check, validationResult } = require("express-validator");
const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

//LOAD MODEL
const Hospital = require("../../models/Hospital");

// @route   POST api/hospital/add
// @desc    Add New hospital
// @access  
router.post(
    "/add",
    // passport.authenticate('jwt', { session: false }),
    [
        check("name", "Name field is required.")
        .not()
        .isEmpty(),
        check("city", "city field is required.")
        .not()
        .isEmpty(),
        check("fullAddress", "fullAddress field is required.")
        .not()
        .isEmpty(),
        check("postCode", "postCode field is required.")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req).formatWith(errorFormatter);
            
            if (!errors.isEmpty()) {
                return res.json({ status: 400, success: false, errors: errors.mapped() });
            }

            const newHospital = new Hospital({
                name: req.body.name,
                city: req.body.city.toLowerCase(),
                fullAddress: req.body.fullAddress,
                postCode: req.body.postCode
            });

            const save = await newHospital.save();

            return res.json({ status: 200, success: true, data: save });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

// @route   POST api/hospital/list
// @desc    Get list hospital
// @access  
router.get(
    "/list",
    // passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const get = await Hospital.find({ isDelete: false, active: true });

            return res.json({ status: 200, success: true, data: get });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

module.exports = router;
