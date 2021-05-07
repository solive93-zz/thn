const { test, expect } = require("@jest/globals");
const { fireEvent, getByText } = require("@testing-library/dom")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs")
const path = require("path")
const getSearchData = require("./parser.js")


const html = fs.readFileSync(path.resolve(__dirname, './availability.html'), 'utf8');
const dom = new JSDOM(html)
const document = dom.window.document

describe('Test getUserSearchData function against availability.html', () => {
    test('the return value should be an object', () => {
        expect(typeof getSearchData()).toBe('object')
    })

    describe('The returned object', () => {
        it('should contain the check-in date', () => {
            let checkIn = document.getElementById('fb-qs-summary-dates-arrival').firstChild.getAttribute('data-date')
            
            expect(checkIn).toBe('2021-06-21')
            expect(typeof checkIn).toBe('string')
        })

        it('should contain the check-out date', () => {
            let checkOut = document.getElementById('fb-qs-summary-dates-departure').firstChild.getAttribute('data-date')

            expect(checkOut).toBe('2021-06-25')
            expect(typeof checkOut).toBe('string')
        })
        
        it('should contain the minimum price', () => {
            let minimumPrice = document.querySelector('.fb-results-accommodation').querySelector(".new-price").firstChild.getAttribute('data-price');;
            let minimumPriceFloatVal = Math.round(minimumPrice * 100) / 100;
            
            expect(minimumPriceFloatVal).toBe(354.71)
            expect(typeof minimumPriceFloatVal).toBe('number')
        })

        it('should contain the currency code', () => {
            let currency = document.getElementById('fb-headbar-block-currency').querySelector('.fb-headbar-value').textContent;
            let currencyCode = currency.substring(
                currency.indexOf( '(' ) +1, currency.indexOf( ')' ) 
            )

            expect(currencyCode).toBe('EUR')
            expect(typeof currencyCode).toBe('string')
        })

        it('should contain the number of rooms desired', () => {
            let numberOfRooms = + document.getElementById('fb-qs-summary-rooms-quantity').firstChild.getAttribute('data-mode');
            
            expect(numberOfRooms).toBe(1)
            expect(typeof numberOfRooms).toBe('number')
        })

        it('should contain the number of guests (splitted by adults and children)', () => {
            let numberOfGuests = {
                adults: + document.getElementById('fb-qs-summary-rooms-adults').firstChild.getAttribute('data-mode'),
                children: + document.getElementById('fb-qs-summary-rooms-children').querySelector("[data-key='child']").getAttribute('data-mode')
            }
            expect(numberOfGuests.adults).toBe(2)
            expect(numberOfGuests.children).toBe(1)
            expect(typeof numberOfGuests.adults).toBe('number')
            expect(typeof numberOfGuests.children).toBe('number')
        })

        it('should contain the total amount of guests', () => {
            let adults = + document.getElementById('fb-qs-summary-rooms-adults').firstChild.getAttribute('data-mode')
            let children = + document.getElementById('fb-qs-summary-rooms-children').querySelector("[data-key='child']").getAttribute('data-mode')
            let totalAmountOfGuests = adults + children
            
            expect(totalAmountOfGuests).toBe(3)
            expect(typeof totalAmountOfGuests).toBe('number')
        })

        test('contain the language code', () => {
            let languageCode = document.firstElementChild.getAttribute('lang').toLocaleUpperCase()
            
            expect(languageCode).toBe('ES')
            expect(typeof languageCode).toBe('string')
        })
    })
})
// ----------------------------------
// describe('The returned object should', () => {
//     
//   

//     test('contain the language code', () => {
//         expect(getSearchData().langaugeCode).toBe('ES')
//         expect(typeof getSearchData().langaugeCode).toBe('string')
//     })
// })