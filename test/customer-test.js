import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/classes/Customer';
import { allCustomers } from '../src/test-data/customer-data';
import { allRooms } from '../src/test-data/room-data';
import { bookings } from '../src/test-data/booking-data';
import { Booking } from '../src/classes/Booking';

describe('Customer', () => {
  let booking1, booking2, customer1, customer2;
  beforeEach(() => {
    let booking1 = new Booking(bookings[0]);
    let booking2 = new Booking(bookings[1]);
    customer1 = new Customer(allCustomers[0]);
    customer2 = new Customer(allCustomers[1]);
  });

  it('Should be a function ', () => {
    expect(Customer).to.be.a('function');
  });

  it('Should have a name', () => {
    expect(customer1.name).to.equal(allCustomers[0].name);
  });

  it('Should have an id', () => {
    expect(customer1.id).to.equal(allCustomers[0].id);
  });

  it('Should have a default totalSpent of 0, until tallied', () => {
    expect(customer1.totalSpent).to.equal(0);
  });

  it('Should have an empty list of bookings by default', () => {
    expect(customer1.bookings.length).to.equal(0);
    expect(customer1.bookings).to.deep.equal([]);
  });

  it('Should have an empty list of available room numbers by default', () => {
    expect(customer1.availableRoomNums.length).to.equal(0);
    expect(customer1.availableRoomNums).to.deep.equal([]);
  });

  it('Should have an empty list of available room numbers based on room type by default', () => {
    expect(customer1.availableRoomNumsByType.length).to.equal(0);
    expect(customer1.availableRoomNumsByType).to.deep.equal([]);
  });

  it('Should return a list of room numbers for rooms that are available on only the booking date', () => {
    const roomNums = customer1.filterRoomAvailabilityByDate("2020/04/22", bookings)
   
    const expectedRoomNums = [1]; 
    expect(roomNums).to.deep.equal(expectedRoomNums);
  });

  it('Should show a list of all room details for the rooms available on the booking date', () => {
    const roomDeets = [allRooms[1], allRooms[2], allRooms[3], allRooms[4], allRooms[5], allRooms[6], allRooms[7], allRooms[8], allRooms[9]];
    customer1.filterRoomAvailabilityByDate("2020/04/22", bookings);
    let roomDetails  = customer1.getAvailableRoomDetails(allRooms)
    expect(roomDetails).to.deep.equal(roomDeets);
  });

  it("Should filter a list of available rooms by roomType", () => {
    const roomDeets = [allRooms[1], allRooms[2], allRooms[3], allRooms[4], allRooms[5], allRooms[6], allRooms[7], allRooms[8], allRooms[9]];
    customer1.filterRoomAvailabilityByDate("2020/04/22", bookings);
    let roomDetails  = customer1.getAvailableRoomDetails(allRooms)
    expect(roomDetails).to.deep.equal(roomDeets);

    let filteredByType = customer1.filterRoomsByRoomType(allRooms, "suite");

    expect(filteredByType).to.deep.equal([allRooms[1], allRooms[9]]);
    expect(customer1.availableRoomNumsByType).to.deep.equal([allRooms[1].number, allRooms[9].number]);
  });

  it("Should be able to store an array of all the customer's bookings", () => {
    customer1.viewMyBookings(bookings);
    expect(customer1.bookings).to.deep.equal([bookings[0]]);
  });

  it("Should be able to return an array of all the customer's bookings", () => {
    let customerBookings = customer1.viewMyBookings(bookings);
    expect(customerBookings).to.deep.equal([bookings[0]]);
  });

  it('Should be able to store the total amount a specific customer has spent', () => {
    customer1.viewCustomerTotalSpending(bookings, allRooms);
    expect(customer1.totalSpent).to.equal(allRooms[0].costPerNight);
  });

  it('Should be able to return the total amount a specific customer has spent', () => {
    let total = customer1.viewCustomerTotalSpending(bookings, allRooms);
    expect(total).to.equal(allRooms[0].costPerNight);
  });

  it("Should be able to check room availability and return true", () => {
    let bool = customer1.checkRoomAvailability("2020/04/22", bookings, allRooms, "suite");
    expect(bool).to.be.true;
  });

  it("Should be able to check room availability and return false", () => {
    let bool2 = customer2.checkRoomAvailability("2020/04/22", bookings, allRooms, "residential suite");
    expect(bool2).to.be.false
  });

});
