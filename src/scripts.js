// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/hungary.png'
import './images/the-grand-budapest-hotel.png'
import './images/junior suite.png'
import './images/suite.png'
import './images/residential suite.png'
import './images/single room.png'

import { postData, retrieveData } from './apiCalls';
import Customer from './classes/Customer';

console.log('This is the JavaScript entry file - your code begins here.');

//Put query-selectors here
import { 
  totalSpent,
  guestName,
  roomSelectionForm,
  displayRoomDetails,
  calendar,
  roomDropDown,
  renderUserInfo,
  renderRoomCards,
  mainCardsArea,
  usernameArea,
  passwordArea,
  loginButton,
  loginErrorArea,
  loginArea,
  hotelCheckInInfo,
  hotelImage,
} from './domUpdates';


//window.onload = startUp();
window.onload = startUp(1);
let startUpData = [];
let guestID = 1;

//change everything for accessibility
function startUp(userID) {
  retrieveData(userID)
    .then(promise => {
      let customers = promise[0];
      let currCustomer = promise[1];
      let rooms = promise[2];
      let bookings = promise[3];
      startUpData = [customers, currCustomer, rooms, bookings];
      console.log(promise);
      console.log(startUpData, "HEY your data on startup");
      currCustomer = new Customer(currCustomer);

      //import render info here...>>>>
      renderUserInfo(currCustomer, bookings, rooms);
    }).catch(err => console.error("Error is happening scripts", err));
}

calendar.addEventListener('change', () => updateByDate());
roomDropDown.addEventListener('change', () => updateByRoomType());

let updateByDate = () => {
  // let bookings = startUpData[3];
  
  // let date = calendar.value.split("-").join('/')
  
  // currCustomer.filterRoomAvailabilityByDate(date, bookings.bookings);
  
  // let availableRoomDetails = currCustomer.getAvailableRoomDetails(rooms.rooms)
  // renderRoomCards(availableRoomDetails);  

  startUp(guestID);
  let currCustomer = new Customer(startUpData[1]);
  let rooms =  startUpData[2];

  //Filter based on the drop-down value
  if (roomDropDown.value) {
    let filteredRoomsByType = currCustomer
      .filterRoomsByRoomType(rooms.rooms, roomDropDown.value)
    renderRoomCards(filteredRoomsByType);
  }
}

let updateByRoomType = () => {
  let currCustomer = new Customer(startUpData[1]);
  let rooms =  startUpData[2];
  let bookings = startUpData[3];

  let date = calendar.value.split("-").join('/');
  

  currCustomer.filterRoomAvailabilityByDate(date, bookings.bookings);
  //Filter based on the drop-down value
  if (roomDropDown.value) {
    let filteredRoomsByType = currCustomer
      .filterRoomsByRoomType(rooms.rooms, roomDropDown.value)
    renderRoomCards(filteredRoomsByType);
  } else {
    //otherwise show all rooms;
    let availableRoomDetails = currCustomer.getAvailableRoomDetails(rooms.rooms)
    renderRoomCards(availableRoomDetails);    
  }
}

mainCardsArea.addEventListener('click', (e) => bookRoom(e));

let bookRoom = (e) => {
    
  if (e.target.closest('button')) {
    let roomNumber = parseInt(e.target.closest('button').id)
    let userID = startUpData[1].id; //suss
    let date = calendar.value.split("-").join('/');

    let postableData = {
      userID,
      date,
      roomNumber,
    }

    console.log(postableData);
    postData(postableData).then(
      response => console.log(response)
    ).catch(err => {
      console.error(err);
    })

    //console.log("This is the event", e.target.closest('button'));
    e.target.closest('button').setAttribute("disabled", "true");
    e.target.closest('button').innerText = "Booked!"

    startUp(guestID);
  }
  //customer id is startUpArr[1].id
  //roomNumber is e.target.closest('button')
  //date calendar.value.split("-").join('/')
  //
  /*
    { "userID": 48, "date": "2019/09/23", "roomNumber": 4 }

     */
}


// loginButton.addEventListener('click', (e) => loginValidation(e));
// let loginValidation = (e) => {
//   e.preventDefault();
//   let usernameInput = usernameArea.value
//   let splitUsername =  usernameInput.split('r');
//   let passwordInput = passwordArea.value;
//   if (passwordInput === 'overlook2021' 
//     && splitUsername[0] === 'custome' 
//     && (splitUsername[1] >= 1 && splitUsername[1] <= 50)) {
//     guestID = splitUsername[1];
//     startUp(guestID);
//     loginErrorArea.classList.add('hide');
//     loginArea.classList.add('hide');
//     hotelImage.classList.add('hide');
//     hotelCheckInInfo.classList.remove('hide');
//     console.log('SUCCESSFUL LOGIN!');
//     //renderPage();
//   } else {
//     loginErrorArea.classList.remove('hide');
//   }
// }

// function renderLoginSetup() {
//   loginErrorArea.classList.add('hide');
//   //loginArea.classList.add('hide');
//   //hotelImage.classList.add('hide');
//   hotelCheckInInfo.classList.add('hide');
// }
