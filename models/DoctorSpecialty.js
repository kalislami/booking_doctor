const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpecialtySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = Specialty = mongoose.model("doctor_specialty", SpecialtySchema);