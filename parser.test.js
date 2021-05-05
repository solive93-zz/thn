// const parser = require('./parser)

const { test, expect } = require("@jest/globals");

test('true is true', () => {
    expect(true).toBe(true);
})
test('false is not true', () => {
    expect(false).not.toBe(true);
})