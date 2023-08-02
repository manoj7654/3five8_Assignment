// importing getBookings and addBookings function for adding newly booking and finding previous booking
const { getBookings, addBooking } = require('../models/bookingModel');


// for finding time difference

const timeDifference=(startTime,endTime)=>{
  const [hour1,minutes1]=startTime.split(":").map(Number)
  const [hour2,minutes2]=endTime.split(":").map(Number);

  let totalMinutes1=hour1*60+minutes1;
  let totalMinutes2=hour2*60+minutes2

  let totalDifferenceInMinutes=totalMinutes2-totalMinutes1

  if(totalDifferenceInMinutes<0){
    totalDifferenceInMinutes+=24*60
  }
// Convert the time difference to hours
const differenceInHours = totalDifferenceInMinutes / 60;

return differenceInHours;

}


// creating new booking facility
const bookingFacility = (req, res) => {
  try {
    const { facility, date, startTime, endTime } = req.body;

    // here checking already booked facility or not
    const alreadyBooking = getBookings().find((ele) => {
      return (
        ele.facility === facility &&
        ele.date === date &&
        ((startTime >= ele.startTime && startTime < ele.endTime) ||
          (endTime > ele.startTime && endTime <= ele.endTime) ||
          (startTime <= ele.startTime && endTime >= ele.endTime))
      );
    });

    // if already booked then return a message 
    if (alreadyBooking) {
      return res.status(400).json({ message: 'Booking Failed,Already Booked' });
    }
    
    let Amount=0;
    //  for clubhouse finding amount
    if(facility=="Clubhouse"){
      if(startTime>="10:00"&& endTime<="16:00"){
        Amount+=timeDifference(startTime,endTime)*100
      }else if(startTime>="16:00"&& endTime<="22:00"){
        Amount+=timeDifference(startTime,endTime)*500
        
      }
    }

//  for tennis court finding amount
    if(facility=="Tennis Court"){
        Amount+=timeDifference(startTime,endTime)*50
    }
   
 
    // creating new bookings
    const newBooking = {
      facility,
      date,
      startTime,
      endTime,
      Amount
    };

    addBooking(newBooking);
    console.log(newBooking)
    return res.status(200).json({ message: 'Booked', Amount });
  } catch (error) {
    return res.status(500).json({ message: 'Booking Failed' });
  }
};

//  exporting 
module.exports = {
    bookingFacility,
};
