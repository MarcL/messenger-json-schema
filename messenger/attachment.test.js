const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const attachmentSchema = require('./attachment');

describe('Attachment message', () => {
    const validImageUri = 'https://www.test.com/test-image.jpg';
    let validate;
    
    beforeEach(() => {
        validate = ajv.compile(attachmentSchema);
    })

    test('Valid message with url', () => {
        const givenMessage = {
            attachment: {
                type: 'image',
                payload: {
                    url: validImageUri,
                    is_reusable: true
                }
            }
        };

        validate(givenMessage);
        
        expect(validate.errors).toBeNull();
    });

    test('Valid message with attachment_id', () => {
        const givenMessage = {
            attachment: {
                type: 'image',
                payload: {
                    attachment_id: '123456789'
                }
            }
        };

        validate(givenMessage);
        
        expect(validate.errors).toBeNull();
    });

    describe('Invalid message', () => {
        const invalidScenarios = [
            {
                testMessage: 'Message has no attachment property',
                givenMessage: {}
            },
            {
                testMessage: 'Message has no attachment.type property',
                givenMessage: {
                    attachment: {}
                }
            },
            {
                testMessage: 'Message has no attachment.payload property',
                givenMessage: {
                    attachment: {
                        type: 'image'
                    }
                }
            },
            {
                testMessage: 'Message has no attachment.payload.url property',
                givenMessage: {
                    attachment: {
                        type: 'image',
                        payload: {}
                    }
                }
            },
            {
                testMessage: 'Message has invalid attachment.payload.url property',
                givenMessage: {
                    attachment: {
                        type: 'image',
                        payload: {
                            url: 'not-a-uri'
                        }
                    }
                }
            },
            {
                testMessage: 'Message has invalid attachment.type property',
                givenMessage: {
                    attachment: {
                        type: 'invalid attachment type',
                        payload: {
                            url: validImageUri
                        }
                    }
                }
            },
            {
                testMessage: 'Message has invalid attachment.payload.is_reusable property type',
                givenMessage: {
                    attachment: {
                        type: 'image',
                        payload: {
                            url: validImageUri,
                            is_reusable: 'not a boolean'
                        }
                    }
                }
            },
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
