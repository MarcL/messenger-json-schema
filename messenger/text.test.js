const Ajv = require('ajv');
const textSchema = require('./text');

const ajv = new Ajv({allErrors: true, jsonPointers: true});

describe('Text message', () => {
    let validate;
    
    beforeEach(() => {
        validate = ajv.compile(textSchema);
    });

    test('Valid message', () => {
        const givenMessage = {
            text: 'Valid message'
        };

        validate(givenMessage);
        
        expect(validate.errors).toBeNull();
    });

    describe('Invalid message', () => {
        const invalidScenarios = [
            {
                testMessage: 'Message is not a string',
                givenMessage: {
                    text: 100
                }
            },
            {
                testMessage: 'Message missing text property',
                givenMessage: {}
            },
            {
                testMessage: 'Message contains additional properties',
                givenMessage: {
                    text: 'Message',
                    invalid: 'Invalid property'
                }
            }
        ];

        invalidScenarios.forEach(scenario => {
            const {testMessage, givenMessage} = scenario;

            test(testMessage, () => {        
                validate(givenMessage);

                expect(validate.errors).toMatchSnapshot();
            });
        });

        test('Message length is greater than 2000 characters', () => {
            const message = new Array(2001).fill('a').join('');
            const givenMessage = {
                text: message
            };

            validate(givenMessage);

            expect(validate.errors).toMatchSnapshot();
        });
    });
});
