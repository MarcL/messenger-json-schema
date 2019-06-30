const textSchema = {
    '$schema': 'http://json-schema.org/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {
        text: {
            type: 'string',
            maxLength: 2000
        }
    }
};

module.exports = textSchema;
