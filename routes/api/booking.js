const express = require("express");
const router = express.Router();
// const keys = require("../../config/keys");
const passport = require("passport");

const { check, validationResult } = require("express-validator");
const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

//LOAD MODEL
const Booking = require("../../models/Booking");

// @route   POST api/Booking
// @desc    Booking Doctor
// @access  
router.post(
    "/",
    passport.authenticate('jwt', { session: false }),
    [
        check("bookingTime", "bookingTime field is required.")
        .not()
        .isEmpty(),
        check("hospitalID", "hospitalID field is required.")
        .not()
        .isEmpty(),
        check("doctorID", "doctorID field is required.")
        .not()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req).formatWith(errorFormatter);
            
            if (!errors.isEmpty()) {
                return res.json({ status: 400, success: false, errors: errors.mapped() });
            }

            const newBooking = new Booking({
                bookingTime: req.body.bookingTime,
                hospitalID: req.body.hospitalID,
                doctorID: req.body.doctorID,
                userID: req.user.id
            });

            const save = await newBooking.save();

            return res.json({ status: 200, success: true, data: save, msg: 'booking success' });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

// @route   POST api/booking/list/
// @desc    Get list booking by userID
// @access  
router.get(
    "/list",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const get = await Booking.find({ isDelete: false, active: true, userID: req.user.id })
                .populate("hospitalID", "_id name city")
                .populate("doctorID", "_id name");

            return res.json({ status: 200, success: true, data: get });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

// @route   POST api/booking/detail/:id
// @desc    Get detail booking by id
// @access  
router.get(
    "/detail/:id",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const get = await Booking.findById(req.params.id)
                                    .populate("hospitalID", "_id name")
                                    .populate("doctorID", "_id name");

            return res.json({ status: 200, success: true, data: get });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

module.exports = router;
