import chai from 'chai';
import { Booking } from '../src/classes/Booking';
import { bookings } from '../src/test-data/booking-data';

const expect = chai.expect;

describe('Booking', () => {
  let booking1;
  beforeEach(() => { 
    booking1 = new Booking(bookings[0]);
  });

  it('Should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('Should store the values of the booking ID ', () => {    
    expect(booking1.id).to.equal(bookings[0].id);
  });

  it("Should store the associate user ID", () => {
    expect(booking1.userID).to.equal(bookings[0].userID);
  });

  it("Should store the booking date", () => {
    expect(booking1.date).to.equal(bookings[0].date);
  });

  it("Should store the booking room number", () => {
    expect(booking1.roomNumber).to.equal(bookings[0].roomNumber);
  });

  it("Should store the associated booking's room service charges", () => {
    expect(booking1.roomServiceCharges).to.equal(bookings[0].roomServiceCharges);
  });

  it("Should have a method to add room service charges!", () => {
    booking1.addCharges(27);
    expect(booking1.roomServiceCharges[0]).to.equal(27);

    booking1.addCharges(30);
    booking1.addCharges(40);
    expect(booking1.roomServiceCharges[1]).to.equal(30);
    expect(booking1.roomServiceCharges[2]).to.equal(40);
  });

  it("Should have a method to tally all room service charges!", () => {
    expect(booking1.tallyCharges()).to.equal(97);
  })
});
