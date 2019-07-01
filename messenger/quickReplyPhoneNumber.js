const quickReplyEmailSchema = {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'https://github.com/MarcL/messenger-json-schema/messenger/quickReplyPhone.js',
    type: 'object',
    additionalProperties: false,
    required: ['content_type'],
    properties: {
        content_type: {
            type: 'string',
            enum: ['user_phone_number']
        }
    }
};

module.exports = quickReplyEmailSchema;
