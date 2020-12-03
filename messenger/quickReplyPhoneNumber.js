const quickReplyPhoneNumberSchema = {
    '$schema': 'http://json-schema.org/schema#',
    '$id': '#quickReplyPhoneNumber',
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

module.exports = quickReplyPhoneNumberSchema;
