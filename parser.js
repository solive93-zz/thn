// document.addEventListener('DOMContentLoaded', ()=>{ all your code })

function getSearchData() {
    return {
        checkIn: "2021-06-21",
        checkOut: "albatrose",
        minimumPrice: 354.71,
        currencyCode: 'EUR',
        numberOfRooms: 1,
        numberOfGuests: {
            adults: 2,
            children: 1
        },
        totalAmountOfGuests: 3,
        languageCode: 'ES',
        roomDetails: {},
        allRates: {}
    };
}

function getCheckInDate() {
    let checkInTag = document.getElementById('fb-qs-summary-dates-arrival').firstChild;
    return checkInTag.getAttribute('data-date')
}

function getCheckOutDate() {
    let checkOutTag = document.getElementById('fb-qs-summary-dates-departure').firstChild;
    return checkOutTag.getAttribute('data-date')
}

function getMinimumPrice() {
    let results = document.getElementsByClassName('fb-results-accommodation')
    let lowestPrice = 0;
    // Since the prices are displayed in order from lowest to highest, I could just pick the first one
    Array.from(results).forEach( (room, index, array) => {
        let price = room.querySelector(".new-price").firstChild.getAttribute('data-price');
        if(index === 0 || parseFloat(price) < parseFloat(lowestPrice)) {
            lowestPrice = price;
        }
    })
    return Math.round(lowestPrice * 100) / 100;

    // I could probably do something like this:

    // let firstResult = document.querySelector('.fb-results-accommodation');
    // let price = firstResult.querySelector(".new-price").firstChild.getAttribute('data-price');
    // return Math.round(price * 100) / 100;
}

function getCurrency() {
    let currency = document.getElementById('fb-headbar-block-currency').querySelector('.fb-headbar-value').textContent;
    let currencyCode = currency.substring(
        currency.indexOf( '(' ) +1, currency.indexOf( ')' ) 
    )
    return currencyCode;
}

function getNumberOfRooms() {
    let roomTag = document.getElementById('fb-qs-summary-rooms-quantity').firstChild;
    return + roomTag.getAttribute('data-mode')
}

function getNumberOfGuests() {
    let adultsTag = document.getElementById('fb-qs-summary-rooms-adults').firstChild;
    let childrenTag = document.getElementById('fb-qs-summary-rooms-children').querySelector("[data-key='child']");
    
    return {
        adults: + adultsTag.getAttribute('data-mode'),
        children: + childrenTag.getAttribute('data-mode')
    }
}

function getTotalAmountOfGuests() {
    let guests = getNumberOfGuests()
    return guests.adults + guests.children
}

function getLanguageCode() {
    let lang = document.firstElementChild.getAttribute('lang')
    return lang.toUpperCase()
}



module.exports = getSearchData;
// vs export default ¿?