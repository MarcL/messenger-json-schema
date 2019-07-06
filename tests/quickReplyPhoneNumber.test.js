const ajv = require('./ajv');
const quickReplyPhoneNumber = require('../messenger/quickReplyPhoneNumber');

describe('Quick reply: phone number message', () => {
    let validate;
    
    beforeEach(() => {
        validate = ajv.compile(quickReplyPhoneNumber);
    });

    test('Valid message', () => {
        const givenMessage = {
            content_type: 'user_phone_number'
        };

        validate(givenMessage);
        
        expect(validate.errors).toBeNull();
    });

    describe('Invalid message', () => {
        const invalidScenarios = [
            {
                testMessage: 'Message is not a string',
                givenMessage: {
                    content_type: 100
                }
            },
            {
                testMessage: 'Message missing content_type property',
                givenMessage: {}
            },
            {
                testMessage: 'Message contains additional properties',
                givenMessage: {
                    content_type: 'user_phone_number',
                    invalid: 'Invalid property'
                }
            },
            {
                testMessage: 'Message contains invalid content_type property',
                givenMessage: {
                    content_type: 'not_user_email'
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
    });
});
