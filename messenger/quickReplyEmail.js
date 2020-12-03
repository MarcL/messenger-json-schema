const quickReplyEmailSchema = {
    '$schema': 'http://json-schema.org/schema#',
    '$id': '#quickReplyEmail',
    type: 'object',
    additionalProperties: false,
    required: ['content_type'],
    properties: {
        content_type: {
            type: 'string',
            enum: ['user_email']
        }
    }
};

module.exports = quickReplyEmailSchema;
