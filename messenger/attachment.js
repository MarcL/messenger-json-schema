const attachmentSchema = {
    '$schema': 'http://json-schema.org/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['attachment'],
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
                }
            }
        }
    }
};

module.exports = attachmentSchema;
