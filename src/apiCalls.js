import { hotelCheckInInfo, loginButton, mainCardsArea } from "./domUpdates";
let baseUrl = 'http://localhost:3001/api/v1/'

/////////NIK's re-implimented code/////////////////////////////////
const displayErrorMesssage = (err) => {
  const errorField = mainCardsArea;
  const message =
    err.message === "Failed to fetch"
      ? "Our network temporarily is down due to cyber attacks. Please call us or email us @ thegrandbudapest@gmail.com"
      : err.message;
  errorField.innerHTML = message;
  hotelCheckInInfo.classList.add('hide')
};
const disableLoginButton = () => {
  loginButton.setAttribute('disabled', 'true');
  loginButton.style.background = "red";
  loginButton.style.cursor = "not-allowed";
}
//***********************************ALL GET RELATED INFO ******************/
let getData = (endpoint, id) => {
  let url = (id) ? `${baseUrl}${endpoint}/${id}` : `${baseUrl}${endpoint}`;    
  return fetch(url)
    .then(response => {
      console.log(response)
      return response.json()
    })
    .catch(err => {
      disableLoginButton();
      displayErrorMesssage(err)
      console.log('Get didnt work!', err)
      throw new Error();
    })
};
//Make sure to double check the getData running with the userId, I can't run this whole method, unless I 
// I have the users Id at this point meaning the last two chars spliced off the end of the userInput on the login.
function retrieveData(userId) {
  return Promise.all([getData('customers'), getData('customers', userId), getData('rooms'), getData('bookings')])
}
//***********************************ALL GET RELATED INFO ******************/
//***********************************ALL POSTS RELATED INFO ******************/
let bookingPost  = {"userID": 48, "date": "2019/09/23", "roomNumber": 4, } // an example of what would be passed through sentData
let sendData = (sentData, url) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(sentData),
    headers: {'Content-Type': 'application/json'},
  })
    .then(response => response.json())
    .then(json => console.log("Json post being sent from the apiCalls.js", json))
    .catch(err => {
      displayErrorMesssage(err);
      throw new Error();
      //console.log(err)
    });
}
//example postcall would be postData(bookingPost);
let postData = (postableData) => {
  return Promise.all([sendData(postableData, `${baseUrl}bookings`)]);
}
//***********************************ALL POSTS RELATED INFO ******************/
//***********************************ALL DELETE RELATED INFO ******************/
let deleteBooking = (bookingId) => {
  const deleteMethod = {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
  }      
  return fetch(`${baseUrl}/bookings/${bookingId}`, deleteMethod) 
    .then(response => response.json())
    .then(data => console.log(data)) 
    .catch(err => console.log(err))
}
//***********************************ALL DELETE RELATED INFO ******************/
export {retrieveData, postData, deleteBooking};