const quickReplyDefinitions = require('./quickReplyDefinitions');

const textSchema = {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'https://github.com/MarcL/messenger-json-schema/messenger/text.js',
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    definitions: quickReplyDefinitions,
    properties: {
        text: {
            type: 'string',
            maxLength: 2000
        },
        quick_replies: {
            type: 'array',
            maxItems: 13,
            items: {
                anyOf: [
                    {'$ref': '#/definitions/quickReplyTextSchema'},
                    {'$ref': '#/definitions/quickReplyEmailSchema'},
                    {'$ref': '#/definitions/quickReplyPhoneNumberSchema'},
                ]
            }
        }
    }
};

module.exports = textSchema;
