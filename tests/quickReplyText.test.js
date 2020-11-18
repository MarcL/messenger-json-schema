const ajv = require('./ajv');
const quickReplyText = require('../messenger/quickReplyText');

describe('Quick reply: text message', () => {
    let validate;
    
    beforeEach(() => {
        validate = ajv.compile(quickReplyText);
    });

    test('Valid message with string payload', () => {
        const givenMessage = {
            content_type: 'text',
            title: 'title',
            payload: 'payload'
        };

        validate(givenMessage);
        
        expect(validate.errors).toBeNull();
    });

    test('Valid message with number payload', () => {
        const givenMessage = {
            content_type: 'text',
            title: 'title',
            payload: 1001
        };

        validate(givenMessage);
        
        expect(validate.errors).toBeNull();
    });

    test('Valid message with image_url', () => {
        const givenMessage = {
            content_type: 'text',
            title: 'title',
            payload: 'payload',
            image_url: 'https://www.test.com/image.jpg'
        };

        validate(givenMessage);
        
        expect(validate.errors).toBeNull();
    });

    test('Message must contain image_url property if title is an empty string', () => {
        const givenMessage = {
            content_type: 'text',
            title: '',
            payload: 'payload',
            image_url: 'https://www.test.com/image.jpg'
        };

        validate(givenMessage);

        expect(validate.errors).toBeNull();
    });

    describe('Invalid message', () => {
        const invalidScenarios = [
            {
                testMessage: 'Message is missing a content_type property',
                givenMessage: {
                    title: 'title',
                    payload: 'payload'
                }
            },
            {
                testMessage: 'Message has a content_type which is not a string',
                givenMessage: {
                    content_type: 100,
                    title: 'title',
                    payload: 'payload'
                }
            },
            {
                testMessage: 'Message has a content_type which is invalid',
                givenMessage: {
                    content_type: 'invalid',
                    title: 'title',
                    payload: 'payload'
                }
            },
            {
                testMessage: 'Message contains additional properties',
                givenMessage: {
                    content_type: 'text',
                    title: 'title',
                    payload: 'payload',
                    invalid: 'Invalid property'
                }
            },
            {
                testMessage: 'Message contains invalid payload type',
                givenMessage: {
                    content_type: 'text',
                    title: 'title',
                    payload: true
                }
            },
            {
                testMessage: 'Message contains invalid image_url property',
                givenMessage: {
                    content_type: 'text',
                    title: 'title',
                    payload: 'payload',
                    image_url: ''
                }
            },
            {
                testMessage: 'Message content_type is "text" but it contains no title',
                givenMessage: {
                    content_type: 'text',
                    payload: 'payload',
                }
            },
            {
                testMessage: 'Message content_type is "text" but it contains no payload',
                givenMessage: {
                    title: 'title',
                    content_type: 'text'
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
                content_type: 'text',
                title,
                payload: 'payload'
            };

            validate(givenMessage);

            expect(validate.errors).toMatchSnapshot();
        });

        test('Message payload is greater than 1000 characters', () => {
            const payload = new Array(1001).fill('a').join('');
            const givenMessage = {
                content_type: 'text',
                title: 'title',
                payload
            };

            validate(givenMessage);
            
            expect(validate.errors).toMatchSnapshot();
        });
    });
});
