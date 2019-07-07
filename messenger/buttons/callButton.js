const callButtonSchema = {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'https://github.com/MarcL/messenger-json-schema/messenger/buttons/callButton.js',
    type: 'object',
    additionalProperties: false,
    required: ['type', 'title', 'payload'],
    properties: {
        type: {
            type: 'string',
            enum: ['phone_number']
        },
        title: {
            type: 'string',
            maxLength: 20
        },
        payload: {
            type: 'string',
            // Has to begin with a + (see FB documentation) but no validation
            // is performed on the numbe as these could be localised phone numbers
            pattern: '^\\+[0-9]+'
        }
    }
};

module.exports = callButtonSchema;
