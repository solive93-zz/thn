/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

function getSearchData() {
  try {
    return {
      checkIn: getCheckInDate(),
      checkOut: getCheckOutDate(),
      minimumPrice: getMinimumPrice(),
      priceForMembers: getMemberPrice(),
      currencyCode: getCurrency(),
      numberOfRooms: getNumberOfRooms(),
      numberOfGuests: getNumberOfGuests(),
      totalAmountOfGuests: getTotalAmountOfGuests(),
      languageCode: getLanguageCode(),
      roomDetails: getRoomDetails(),
      allRates: getAllRoomsRates(),
    };
  } catch (error) {
    throw new Error('DATA NOT FOUND');
  }
}

function getCheckInDate() {
  const checkInTag = document.getElementById('fb-qs-summary-dates-arrival').firstChild;
  return validate(checkInTag.getAttribute('data-date'));
}

function getCheckOutDate() {
  const checkOutTag = document.getElementById('fb-qs-summary-dates-departure').firstChild;
  return validate(checkOutTag.getAttribute('data-date'));
}

function getMinimumPrice() {
  const results = document.getElementsByClassName('fb-results-accommodation');
  let lowestPrice = 0;

  Array.from(results).forEach((room, index) => {
    const price = room.querySelector('.new-price').firstChild.getAttribute('data-price');
    if (index === 0 || parseFloat(price) < parseFloat(lowestPrice)) {
      lowestPrice = price;
    }
  });
  return Math.round(lowestPrice * 100) / 100;
}

function getMemberPrice() {
  const memberPriceTag = document.querySelector('.btn--member-price');
  const price = memberPriceTag.querySelector('.fb-price').getAttribute('data-price');

  return validate(Math.round(price * 100) / 100);
}

function getCurrency() {
  const currency = document.getElementById('fb-headbar-block-currency').querySelector('.fb-headbar-value').textContent;
  const currencyCode = currency.substring(
    currency.indexOf('(') + 1, currency.indexOf(')'),
  );
  return validate(currencyCode);
}

function getNumberOfRooms() {
  const roomTag = document.getElementById('fb-qs-summary-rooms-quantity').firstChild;
  return validate(+roomTag.getAttribute('data-mode'));
}

function getNumberOfGuests() {
  const adultsTag = document.getElementById('fb-qs-summary-rooms-adults').firstChild;
  const childrenTag = document.getElementById('fb-qs-summary-rooms-children').querySelector("[data-key='child']");

  return validate({
    adults: +adultsTag.getAttribute('data-mode'),
    children: +childrenTag.getAttribute('data-mode'),
  });
}

function getTotalAmountOfGuests() {
  const guests = getNumberOfGuests();
  return validate(guests.adults + guests.children);
}

function getLanguageCode() {
  const lang = document.firstElementChild.getAttribute('lang');
  return validate(lang.toUpperCase());
}

function getRoomDetails() {
  // The text returned is in the language of the search
  const breakfast = document.querySelector("[data-key='results-rate-meal-type-breakfast']").textContent;
  const refundable = document.querySelector("[data-key='warrant-cancellable-amendable']").textContent;
  const payment = document.querySelector("[data-key='results-rate-payment-hotel']").textContent;

  return validate({
    breakfast,
    refundPolicy: refundable,
    payment,
  });
}

function getAllRoomsRates() {
  const results = document.getElementsByClassName('fb-results-accommodation');
  const roomsRates = [];

  Array.from(results).forEach((room) => {
    const roomInfo = {}; const
      roomDetails = {};
    const price = +room.querySelector('.new-price').firstChild.getAttribute('data-price');

    roomInfo.price = Math.round(price * 100) / 100;
    roomDetails.breakfast = room.querySelector("[data-key='results-rate-meal-type-breakfast']").textContent;
    roomDetails.refundPolicy = room.querySelector("[data-key='warrant-cancellable-amendable']").textContent;
    roomDetails.payment = room.querySelector("[data-key='results-rate-payment-hotel']").textContent;
    roomInfo.roomDetails = roomDetails;

    roomsRates.push(roomInfo);
  });
  return validate(roomsRates);
}

function validate(data) {
  if (!data) {
    throw new Error('DATA NOT FOUND');
  }
  return data;
}

module.exports = getSearchData;
