const quickReplyTextSchema = {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'https://github.com/MarcL/messenger-json-schema/messenger/quickReplyText.js',
    type: 'object',
    additionalProperties: false,
    required: ['content_type', 'title', 'payload'],
    properties: {
        content_type: {
            type: 'string',
            enum: ['text']
        },
        title: {
            type: 'string',
            maxLength: 20
        },
        payload: {
            type: ['string', 'number'],
            maxLength: 1000
        },
        image_url: {
            type: 'string',
            format: 'uri'
        }
    },
    // image_url is required if title is empty
    if: {
        properties: {
            title: {
                pattern: '^$'
            }
        }
    },
    then: {
        required: ['image_url']
    }
};

module.exports = quickReplyTextSchema;
