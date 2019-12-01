var expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate a correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect( typeof message.createdAt ).toBe('number'); //.toBeA doesn't work again for specifying btw number and strings
        expect( message ).toMatchObject({from, text}); //.toInclude doesn't work again
    });
});