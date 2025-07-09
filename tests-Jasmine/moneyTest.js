

import {formatCurrency} from '../scripts/utility_code/formatMoney.js'

// to create a test suite - > in jasmine use describe()
// it() -> is used to describe a function
// expect -> is used to compare other function with a value, it gives us object to compare the value

describe('Test Suit: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
})
