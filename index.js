const text = require('./messenger/text');
const attachment = require('./messenger/attachment');
const quickReplyEmail = require('./messenger/quickReplyEmail');
const quickReplyPhoneNumber = require('./messenger/quickReplyPhoneNumber');
const quickReplyText = require('./messenger/quickReplyText');

module.exports = {
    text,
    attachment,
    quickReplyEmail,
    quickReplyPhoneNumber,
    quickReplyText
};
