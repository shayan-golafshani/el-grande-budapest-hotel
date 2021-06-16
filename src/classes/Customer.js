class Customer {
  constructor(customerInfo) {
    //properties
    //customer id
    this.id = customerInfo.id;
    //customer's name
    this.name = customerInfo.name;
    //this is the the total amount that a customer has spent in their lifetime at the GBH
    this.totalSpent = 0;
    //this is an array of booking objects with all the customer's past info
    this.bookings = [];

    this.availableRoomNums = [];

    this.availableRoomNumsByType = [];
  }

  filterRoomAvailabilityByDate(date, bookings) {
    //rename unavailableRoomsByDate
    //console.log(date, "DATE INSIDE METHOD *****")
    this.availableRoomNums = bookings.filter(booking => booking.date === date)
    .map(booking => booking.roomNumber)
    //console.log("THESE ARE THE NUMS FOR UNAVAiALABLE ROOMS", this.availableRoomNums);
    return this.availableRoomNums;
  }

  getAvailableRoomDetails(rooms) {
    // console.log("Available ROOM LIST", rooms.filter(
    //   room => !this.availableRoomNums.includes(room.number)))

    return rooms.filter(
      room => !this.availableRoomNums.includes(room.number));
  }

  //THIS IS CURRENTLY NOT NEEDED
  // getAvailableRoomDetailsByType(rooms) {
  //   return rooms.filter(
  //     room => this.availableRoomNumsByType.includes(room.number)); 
  // }

  filterRoomsByRoomType(rooms, roomType) {
    let availableRooms = this.getAvailableRoomDetails(rooms);
    let filteredByType = availableRooms.filter(roomObject => roomObject.roomType === roomType);
    this.availableRoomNumsByType  = filteredByType.map(room => room.number);
    return filteredByType; 
  }
  
  viewCustomerTotalSpending(bookings, rooms) {
    this.viewMyBookings(bookings);
    return this.totalSpent = rooms.reduce((amtSpent, room) => {
      this.bookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          amtSpent += room.costPerNight;
        }
      });
      return amtSpent;
    }, 0);
  }

  viewMyBookings(bookings) {
    let custBookings  = bookings.filter(booking => booking.userID === this.id);
    this.bookings = custBookings;
    return custBookings
  }

  checkRoomAvailability(date, bookings, rooms, roomType) {
    this.filterRoomAvailabilityByDate(date, bookings);
    this.filterRoomsByRoomType(rooms, roomType);
    return (!this.availableRoomNumsByType.length) ? false : true; 
    //sorry there are no available rooms of the room type you'd like
    // at the selected date;
  }
}
module.exports = Customer; 