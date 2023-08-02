
const bookings = [];

//  creating function and returning all the data which are booked
function getBookings() {
  return bookings;
}

//  creating function add pushing all the newly created bookings
function addBooking(ele) {
  bookings.push(ele);
}

// console.log(bookings)


// exporting these function for making api requrestt
module.exports = {
  getBookings,
  addBooking,
};
