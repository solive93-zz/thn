const { test, expect } = require("@jest/globals");
const fs = require("fs")
const path = require("path")
const html = fs.readFileSync(path.resolve(__dirname, '../availability.html'), 'utf8');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(html)

const htmlBody = dom.window.document.body.innerHTML

global.document = dom.window.document
global.window = dom.window

const getSearchData = require("../parser.js")


beforeAll(() => {
    document.body.innerHTML = htmlBody
  })

describe('Test getUserSearchData function against availability.html', () => {
    // test('when not executed, it should throw an error', () => {
    //     // const functionNotCalled = () => { throw new TypeError("FUNCTION NOT CALLED") }
        
    //     // expect(functionNotCalled).toThrow(TypeError)
    //     // expect(functionNotCalled).toThrow("FUNCTION NOT CALLED")
    // })

    test('when executed, the return value should be an object', () => {
        expect(typeof getSearchData()).toBe('object')
    })

    describe('The returned object', () => {
        it('should contain the check-in date', () => {
            expect(getSearchData().checkIn).toBe('2021-06-21')
            expect(typeof getSearchData().checkIn).toBe('string')
        })

        it('should contain the check-out date', () => {
            expect(getSearchData().checkOut).toBe('2021-06-25')
            expect(typeof getSearchData().checkOut).toBe('string')
        })
        
        it('should contain the minimum price', () => {
            expect(getSearchData().minimumPrice).toBe(354.71)
            expect(typeof getSearchData().minimumPrice).toBe('number')
        })

        it('should contain the price for website members', () => {
            expect(getSearchData().priceForMembers).toBe(301.50)
            expect(typeof getSearchData().priceForMembers).toBe('number')
        })

        it('should contain the currency code', () => {
            expect(getSearchData().currencyCode).toBe('EUR')
            expect(typeof getSearchData().currencyCode).toBe('string')
        })

        it('should contain the number of rooms desired', () => {
            expect(getSearchData().numberOfRooms).toBe(1)
            expect(typeof getSearchData().numberOfRooms).toBe('number')
        })

        it('should contain the number of guests (splitted by adults and children)', () => {
            expect(getSearchData().numberOfGuests.adults).toBe(2)
            expect(getSearchData().numberOfGuests.children).toBe(1)
            expect(typeof getSearchData().numberOfGuests.adults).toBe('number')
            expect(typeof getSearchData().numberOfGuests.children).toBe('number')
        })

        it('should contain the total amount of guests', () => {
            expect(getSearchData().totalAmountOfGuests).toBe(3)
            expect(typeof getSearchData().totalAmountOfGuests).toBe('number')
        })

        it('contain the language code', () => {
            expect(getSearchData().languageCode).toBe('ES')
            expect(typeof getSearchData().languageCode).toBe('string')
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