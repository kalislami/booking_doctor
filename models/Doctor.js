const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    practice: [
        {
            day: Number,
            startTime: String,
            endTime: String,
            hospital: {
                type: Schema.Types.ObjectId,
                ref: "hospital"
            }
        }
    ],
    skill: [{
        data: String
    }],
    relatedDiseases: [{
        data: String
    }],
    specialty: {
        type: Schema.Types.ObjectId,
        ref: "doctor_specialty"
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

module.exports = Doctor = mongoose.model("doctor", DoctorSchema);