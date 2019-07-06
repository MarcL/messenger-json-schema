const ajv = require('./ajv');
const quickReplyEmail = require('./quickReplyEmail');

describe('Quick reply: email message', () => {
    let validate;
    
    beforeEach(() => {
        validate = ajv.compile(quickReplyEmail);
    });

    test('Valid message', () => {
        const givenMessage = {
            content_type: 'user_email'
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
                    content_type: 'user_email',
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
