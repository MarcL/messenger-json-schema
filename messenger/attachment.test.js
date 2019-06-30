const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const attachmentSchema = require('./attachment');

describe('Attachment message', () => {
    let validate;
    
    beforeEach(() => {
        validate = ajv.compile(attachmentSchema);
    })
    test('Valid message', () => {
        const givenMessage = {
            attachment: {
                type: 'image',
                payload: {
                    url: 'https://www.test.com/test-image.jpg',
                    is_reusable: true
                }
            }
        };

        validate(givenMessage);
        
        expect(validate.errors).toBeNull();
    });

    describe('Invalid message', () => {
        const invalidScenarios = [
            // {
            //     testMessage: 'Message is not a string',
            //     givenMessage: {
            //         text: 100
            //     }
            // },
            // {
            //     testMessage: 'Message missing text property',
            //     givenMessage: {}
            // },
            // {
            //     testMessage: 'Message contains additional properties',
            //     givenMessage: {
            //         text: 'Message',
            //         invalid: 'Invalid property'
            //     }
            // }
        ];

        invalidScenarios.forEach(scenario => {
            const {testMessage, givenMessage} = scenario;

            test(testMessage, () => {        
                validate(givenMessage);

                expect(validate.errors).not.toBeNull();
            });
        });
    });
});
