// importing mongoose for creating bookingSchema and model
const mongoose = require('mongoose');

// bookingSchema
const bookingSchema = new mongoose.Schema({
  facility: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status:{type:Boolean,required:true},
  amount: { type: Number},
});

// booking model
const BookingModel = mongoose.model('bookings', bookingSchema);

// exporting bookingmodel
module.exports = {BookingModel};