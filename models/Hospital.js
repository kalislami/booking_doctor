const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    fullAddress: {
        type: String,
        required: true
    },
    postCode: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = Hospital = mongoose.model("hospital", HospitalSchema);