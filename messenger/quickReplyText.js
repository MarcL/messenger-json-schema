const fluent = require('fluent-schema');

const schema = fluent.object()
    .id('#quickReplyText')
    .title('Facebook Messenger quick replay text message schema')
    .additionalProperties(false)
    .prop('content_type', fluent.string().enum(['text']).required())
    .prop('title', fluent.string().maxLength(20))
    .prop('payload', fluent.anyOf([fluent.string().maxLength(1000), fluent.number()]))
    .prop('image_url', fluent.string().format(fluent.FORMATS.URL))
    // If title is empty, require image_url to be set
    .ifThen(
        fluent.object().prop('title', fluent.string().pattern('^$')),
        fluent.object().prop('image_url', fluent.string().format(fluent.FORMATS.URL).required())
    )
    .ifThen(
        fluent.object().prop('content_type', fluent.string().enum(['text'])),
        fluent.object().prop('title', fluent.string().required())
    )
    .ifThen(
        fluent.object().prop('content_type', fluent.string().enum(['text'])),
        fluent.object().prop('payload', fluent.anyOf([fluent.string(), fluent.number()]).required())
    );

const quickReplyTextSchema = {
    '$schema': 'http://json-schema.org/schema#',
    '$id': '#quickReplyText',
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

// console.log(schema.valueOf().properties.payload);

module.exports = schema.valueOf();
