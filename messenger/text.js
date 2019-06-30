const textMessageSchema = {
    '$schema': 'http://json-schema.org/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {
        text: {
            type: 'string'
        }
    }
};

module.exports = textMessageSchema;
