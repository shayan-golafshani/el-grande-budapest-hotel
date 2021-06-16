//Put your querySelectors here

export let totalSpent = document.getElementById('totalSpent');
export let guestName = document.getElementById('guestName');
export let roomSelectionForm = document.getElementById('roomSelectionForm');
export let displayRoomDetails = document.getElementById('displayRoomDetails');
export let calendar = document.getElementById('calendar');
export let roomDropDown = document.getElementById('roomDropDown');
export let bookingHistory = document.getElementById('bookingHistory');
export let mainCardsArea = document.getElementById("mainCardsArea");

export let renderUserInfo = (currCustomer, bookings, rooms) => {
  
  guestName.innerText = currCustomer.name;
  totalSpent.innerText = currCustomer.viewCustomerTotalSpending(bookings.bookings, rooms.rooms);
  currCustomer.bookings.forEach(booking => {
    bookingHistory.innerHTML += `
        <p> Room number ${booking.roomNumber}</p>
        <p>Booked on ${booking.date}</p>
        <hr>
        `    
  });

  //Filter based on calendar value
  let date = calendar.value.split("-").join('/')
  currCustomer.filterRoomAvailabilityByDate(date, bookings.bookings);
        
  let availableRoomDetails = currCustomer.getAvailableRoomDetails(rooms.rooms)
  renderRoomCards(availableRoomDetails);  
}

export let renderRoomCards = (array) => {
  displayRoomDetails.innerHTML = '';
  if (!array.length) {
    displayRoomDetails.innerHTML = `
     <p class="alert-user">
     We're very sorry, but there are no more rooms available, please adjust your search, or contact us.
     </p>
    `
  } else {
    array.forEach((roomDetail, index) => {
      displayRoomDetails.innerHTML += `
             <div class="grid-item grid-item-${index}">
             <p class="room-number"> Room number: ${roomDetail.number}</p>
             <img class=room-image" src="./images/${roomDetail.roomType}.png" alt="This is a ${roomDetail.roomType}">
             <p class="room-type">Room type: ${roomDetail.roomType}</p>
             <p class="bidet-status"> It is ${roomDetail.bidet} that this room includes life-changing bidet. </p>
             <p class="bed-size">There are ${roomDetail.numBeds} ${roomDetail.bedSize}-sized bed. </p>
             <p class="room-cost">Total: ${Math.floor(roomDetail.costPerNight * 100)} Forints</p>
             <button class="booking-button" id=${roomDetail.number}>Book Now!</button>
         </div>
             `
    });
  }
}

