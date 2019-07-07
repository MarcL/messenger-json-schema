const ajv = require('./ajv');
const attachmentSchema = require('../messenger/attachment');

describe('Attachment message', () => {
    const validImageUri = 'https://www.test.com/test-image.jpg';
    let validate;
    
    beforeEach(() => {
        validate = ajv.compile(attachmentSchema);
    })

    describe('Valid messages', () => {
        test('Message with url', () => {
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

        test('Message contains valid text quick reply', () => {
            const givenMessage = {
                attachment: {
                    type: 'image',
                    payload: {
                        url: validImageUri,
                        is_reusable: true
                    }
                },
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
                attachment: {
                    type: 'image',
                    payload: {
                        url: validImageUri,
                        is_reusable: true
                    }
                },
                quick_replies: [{
                    content_type: 'user_email',
                }]
            };

            validate(givenMessage);
            
            expect(validate.errors).toBeNull();
        });

        test('Message contains valid phone number quick reply', () => {
            const givenMessage = {
                attachment: {
                    type: 'image',
                    payload: {
                        url: validImageUri,
                        is_reusable: true
                    }
                },
                quick_replies: [{
                    content_type: 'user_phone_number',
                }]
            };

            validate(givenMessage);
            
            expect(validate.errors).toBeNull();
        });
        
        test('Message contains multiple quick replies', () => {
            const givenMessage = {
                attachment: {
                    type: 'image',
                    payload: {
                        url: validImageUri,
                        is_reusable: true
                    }
                },
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
