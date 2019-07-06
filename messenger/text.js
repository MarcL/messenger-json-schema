const textSchema = {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'https://github.com/MarcL/messenger-json-schema/messenger/text.js',
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {
        text: {
            type: 'string',
            maxLength: 2000
        },
        quick_replies: {
            type: 'array',
            maxItems: 13
        }
    }
};

module.exports = textSchema;
