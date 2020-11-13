const fluent = require('fluent-schema');
const quickReplyTextSchema = require('./quickReplyText');
const quickReplyPhoneNumberSchema = require('./quickReplyPhoneNumber');
const quickReplyEmailSchema = require('./quickReplyEmail');

const schema = fluent.object()
    .id('https://github.com/MarcL/messenger-json-schema/messenger/text.js')
    .title('Facebook Messenger text message schema')
    .additionalProperties(false)
    .definition('#quickReplyText', fluent.raw(quickReplyTextSchema))
    .definition('#quickReplyEmail', fluent.raw(quickReplyEmailSchema))
    .definition('#quickReplyPhoneNumber', fluent.raw(quickReplyPhoneNumberSchema))
    .prop('text', fluent.string().maxLength(2000).required())
    .prop('quick_replies',
        fluent.array()
            .maxItems(13)
            .items(fluent.anyOf([
                fluent.ref('#quickReplyText'),
                fluent.ref('#quickReplyEmail'),
                fluent.ref('#quickReplyPhoneNumber')
            ])
        )
    );

module.exports = schema.valueOf();
