const quickReplyDefinitions = require('./quickReplyDefinitions');

const attachmentSchema = {
    '$schema': 'http://json-schema.org/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['attachment'],
    definitions: quickReplyDefinitions,
    properties: {
        attachment: {
            type: 'object',
            additionalProperties: false,
            required: ['type', 'payload'],
            properties: {
                type: {
                    type: 'string',
                    enum: ['audio', 'video', 'image', 'file', 'template']
                },
                payload: {
                    type: 'object',
                    properties: {
                        url: {
                            type: 'string',
                            format: 'uri'
                        },
                        is_reusable: {
                            type: 'boolean'
                        },
                        attachment_id: {
                            type: 'string'
                        }
                    },
                    oneOf: [
                        {
                            required: ['url']
                        },
                        {
                            required: ['attachment_id']
                        }
                    ]
                }
            }
        }
    }
};

module.exports = attachmentSchema;
