const ajv = require('./ajv');
const textSchema = require('../messenger/text');

describe('Text message', () => {
    let validate;
    
    beforeEach(() => {
        validate = ajv.compile(textSchema);
    });

    describe('Valid messages', () => {
        test('Message contains string text property', () => {
            const givenMessage = {
                text: 'Valid message'
            };

            validate(givenMessage);
            
            expect(validate.errors).toBeNull();
        });

        test('Message contains valid text quick reply', () => {
            const givenMessage = {
                text: 'Valid message',
                quick_replies: [{
                    content_type: 'text',
                    title: 'Hello',
                    payload: 'validPayload',
                }]
            };

            validate(givenMessage);
            
            expect(validate.errors).toBeNull();
        });

        test('Message contains valid email quick reply', () => {
            const givenMessage = {
                text: 'Valid message',
                quick_replies: [{
                    content_type: 'user_email',
                }]
            };

            validate(givenMessage);
            
            expect(validate.errors).toBeNull();
        });

        test('Message contains valid phone number quick reply', () => {
            const givenMessage = {
                text: 'Valid message',
                quick_replies: [{
                    content_type: 'user_phone_number',
                }]
            };

            validate(givenMessage);
            
            expect(validate.errors).toBeNull();
        });
        
        test('Message contains multiple quick replies', () => {
            const givenMessage = {
                text: 'Valid message',
                quick_replies: [{
                    content_type: 'user_phone_number',
                }, {
                    content_type: 'user_email',
                }, {
                    content_type: 'text',
                    title: 'Hello',
                    payload: 'validPayload',
                }]
            };

            validate(givenMessage);
            
            expect(validate.errors).toBeNull();
        });
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

        test('Message contains more than 13 quick replies', () => {
            const message = new Array(14).fill('1');
            const quickReplies = message.map((number, index) => {
                return {
                    content_type: 'text',
                    title: `Title ${index}`,
                    payload: `Payload ${index}`,
                }                
            });

            const givenMessage = {
                text: 'Text message',
                quick_replies: quickReplies
            };

            validate(givenMessage);

            expect(validate.errors).toMatchSnapshot();
        });
    });
});
