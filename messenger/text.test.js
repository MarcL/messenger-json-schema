const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const textMessageSchema = require('./text');

const validate = ajv.compile(textMessageSchema);

describe('Text message', () => {
    test('Valid text message', () => {
        const givenMessage = {
            text: 'Valid message'
        };

        expect(validate(givenMessage)).toBeTruthy();
    });

    describe('Invalid text message', () => {
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
                expect(validate(givenMessage)).toBeFalsy();
            });
        });
    });
});
