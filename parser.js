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
            allRates: getAllRoomsRates()
        };
    } catch(error) {
        throw new Error("DATA NOT FOUND")
    }
}

function getCheckInDate() {
    let checkInTag = document.getElementById('fb-qs-summary-dates-arrival').firstChild;
    return validate(checkInTag.getAttribute('data-date'))
}

function getCheckOutDate() {
    let checkOutTag = document.getElementById('fb-qs-summary-dates-departure').firstChild;
    return validate(checkOutTag.getAttribute('data-date'))
}

function getMinimumPrice() {
    let results = document.getElementsByClassName('fb-results-accommodation')
    let lowestPrice = 0;
    
    Array.from(results).forEach( (room, index, array) => {
        let price = room.querySelector(".new-price").firstChild.getAttribute('data-price');
        if(index === 0 || parseFloat(price) < parseFloat(lowestPrice)) {
            lowestPrice = price;
        }
    })
    return Math.round(lowestPrice * 100) / 100;
}

function getMemberPrice() {
    let memberPriceTag = document.querySelector('.btn--member-price')
    let price = memberPriceTag.querySelector('.fb-price').getAttribute('data-price')

    return validate(Math.round(price * 100) / 100);
}

function getCurrency() {
    let currency = document.getElementById('fb-headbar-block-currency').querySelector('.fb-headbar-value').textContent;
    let currencyCode = currency.substring(
        currency.indexOf( '(' ) +1, currency.indexOf( ')' ) 
    )
    return validate(currencyCode);
}

function getNumberOfRooms() {
    let roomTag = document.getElementById('fb-qs-summary-rooms-quantity').firstChild;
    return validate(+ roomTag.getAttribute('data-mode'))
}

function getNumberOfGuests() {
    let adultsTag = document.getElementById('fb-qs-summary-rooms-adults').firstChild;
    let childrenTag = document.getElementById('fb-qs-summary-rooms-children').querySelector("[data-key='child']");
    
    return validate({
        adults: + adultsTag.getAttribute('data-mode'),
        children: + childrenTag.getAttribute('data-mode')
    })
}

function getTotalAmountOfGuests() {
    let guests = getNumberOfGuests()
    return validate(guests.adults + guests.children)
}

function getLanguageCode() {
    let lang = document.firstElementChild.getAttribute('lang')
    return validate(lang.toUpperCase());
}

function getRoomDetails() {
    // The text returned is in the language of the search
    let breakfast = document.querySelector("[data-key='results-rate-meal-type-breakfast']").textContent
    let refundable = document.querySelector("[data-key='warrant-cancellable-amendable']").textContent
    let payment = document.querySelector("[data-key='results-rate-payment-hotel']").textContent
    
    return validate({
        breakfast: breakfast,
        refundPolicy: refundable,
        payment: payment,
    })
}

function getAllRoomsRates() {
    let results = document.getElementsByClassName('fb-results-accommodation')
    let roomsRates = []
    
    Array.from(results).forEach( (room, index, array) => {
        let roomInfo = {}, roomDetails = {}
        let price = + room.querySelector(".new-price").firstChild.getAttribute('data-price');
        
        roomInfo.price = Math.round(price * 100) / 100;
        roomDetails.breakfast = room.querySelector("[data-key='results-rate-meal-type-breakfast']").textContent
        roomDetails.refundPolicy = room.querySelector("[data-key='warrant-cancellable-amendable']").textContent
        roomDetails.payment = room.querySelector("[data-key='results-rate-payment-hotel']").textContent
        roomInfo.roomDetails = roomDetails

        roomsRates.push(roomInfo);
    })
    return validate(roomsRates);
}

function validate(data) {
    if(!data) {
        throw new Error("DATA NOT FOUND")
    }
    return data;
}

module.exports = getSearchData
