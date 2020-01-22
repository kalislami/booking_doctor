const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    bookingTime: {
        type: Date,
        required: true
    },
    hospitalID: {
        type: Schema.Types.ObjectId,
        ref: "hospital"
    },
    doctorID: {
        type: Schema.Types.ObjectId,
        ref: "doctor"
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "user"
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

module.exports = Booking = mongoose.model("booking", BookingSchema);