const ajv = require('../ajv');
const callButton = require('../../messenger/buttons/callButton');

describe('Buttons: call button', () => {
    let validate;
    
    beforeEach(() => {
        validate = ajv.compile(callButton);
    });

    test('Valid message with phone number', () => {
        const givenMessage = {
            type: 'phone_number',
            title: 'Call mum',
            payload: '+12345'
        };

        validate(givenMessage);
        
        expect(validate.errors).toBeNull();
    });

    describe('Invalid message', () => {
        const invalidScenarios = [
            {
                testMessage: 'Message type is invalid',
                givenMessage: {
                    type: 'not_phone_number',
                    title: 'Call mum',
                    payload: '+12345'
                }
            },
            {
                testMessage: 'Message missing type property',
                givenMessage: {
                    title: 'Call mum',
                    payload: '+12345'
                }
            },
            {
                testMessage: 'Message missing title property',
                givenMessage: {
                    type: 'not_phone_number',
                    payload: '+12345'
                }
            },
            {
                testMessage: 'Message missing payload property',
                givenMessage: {
                    type: 'phone_number',
                    title: 'Call mum',
                }
            },
            {
                testMessage: 'Message has invalid payload phone number',
                givenMessage: {
                    type: 'phone_number',
                    title: 'Call mum',
                    payload: '12356',
                }
            },
            {
                testMessage: 'Message contains additional properties',
                givenMessage: {
                    type: 'phone_number',
                    title: 'Call mum',
                    payload: '12356',
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

        test('Message title is greater than 20 characters', () => {
            const title = new Array(21).fill('a').join('');
            const givenMessage = {
                type: 'phone_number',
                title,
                payload: '12356'
            };

            validate(givenMessage);

            expect(validate.errors).toMatchSnapshot();
        });
    });
});
