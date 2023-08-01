// importing express for creating bookingRouter
const express=require("express")
const bookingRouter=express.Router()

// importing bookFacility for making request
const { bookingFacility } = require("../controller/booking.controller")

// making post request for newly bookings
bookingRouter.post("/book",bookingFacility)



module.exports={
    bookingRouter
}