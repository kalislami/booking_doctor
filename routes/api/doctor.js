const express = require("express");
const router = express.Router();
const passport = require("passport");

const { check, validationResult } = require("express-validator");
const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

//LOAD MODEL
const Doctor = require("../../models/Doctor");
const Specialty = require("../../models/DoctorSpecialty");

// @route   POST api/doctor/add
// @desc    Add New doctor
// @access  
router.post(
    "/add",
    // passport.authenticate('jwt', { session: false }),
    [
        check("name", "Name field is required.")
        .not()
        .isEmpty(),
        check("practice", "practice field is required.")
        .not()
        .isEmpty(),
        check("skill", "skill field is required.")
        .not()
        .isEmpty(),
        check("relatedDiseases", "relatedDiseases field is required.")
        .not()
        .isEmpty(),
        check("specialty", "specialty field is required.")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req).formatWith(errorFormatter);
            
            if (!errors.isEmpty()) {
                return res.json({ status: 400, success: false, errors: errors.mapped() });
            }

            const newDoctor = new Doctor({
                name: req.body.name,
                practice: req.body.practice,
                skill: req.body.skill,
                relatedDiseases: req.body.relatedDiseases,
                specialty: req.body.specialty
            });

            const save = await newDoctor.save();

            return res.json({ status: 200, success: true, data: save });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

// @route   POST api/doctor/specialty/add
// @desc    Add New doctor specialty
// @access  
router.post(
    "/specialty/add",
    // passport.authenticate('jwt', { session: false }),
    [
        check("name", "name field is required.")
        .not()
        .isEmpty(),
        check("description", "description field is required.")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req).formatWith(errorFormatter);
            
            if (!errors.isEmpty()) {
                return res.json({ status: 400, success: false, errors: errors.mapped() });
            }

            const newSpecialty = new Specialty({
                name: req.body.name,
                description: req.body.description
            });

            const save = await newSpecialty.save();

            return res.json({ status: 200, success: true, data: save });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

// @route   POST api/doctor/detail/:doctorID
// @desc    Get doctor by id
// @access  
router.get(
    "/detail/:doctorID",
    // passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const get = await Doctor.findById(req.params.doctorID)
                                    .populate("practice.hospital", "_id name")
                                    .populate("specialty", "_id name")
            if (!get) {
                return res.json({ status: 400, success: false, errors: { error: "doctor not found (invalid doctorID)" } });
            }

            return res.json({ status: 200, success: true, data: get });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

// @route   POST api/doctor/specialty/list
// @desc    Get list specialty
// @access  
router.get(
    "/specialty/list",
    // passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const get = await Specialty.find({ isDelete: false });

            return res.json({ status: 200, success: true, data: get });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

// @route   POST api/doctor/list
// @desc    Get list doctor
// @access  
router.get(
    "/list",
    // passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const get = await Doctor.find({ isDelete: false, active: true })
                                    .populate("practice.hospital", "_id name")
                                    .populate("specialty", "_id name")

            return res.json({ status: 200, success: true, data: get });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

// @route   POST api/doctor/list/:specialtyID
// @desc    Get list doctor by speciality
// @access  
router.get(
    "/list/:specialtyID",
    // passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const get = await Doctor.find({ isDelete: false, active: true, specialty: req.params.specialtyID })
                                    .populate("practice.hospital", "_id name")

            return res.json({ status: 200, success: true, data: get });
        } 
        catch (err) {
            return res.status(500).json({ success: false, error: err.stack });
        }
    }
);

module.exports = router;
