# messenger-json-schema

> WIP: JSON schema for Messenger messages

## Install

```
npm -i messenger-json-schema
```

```
yarn add messenger-json-schema
```

## Format

Provides schemas for JSON formatted [Facebook Messenger messages](https://developers.facebook.com/docs/messenger-platform/send-messages). Validates against JSON schema using [ajv](https://github.com/epoberezkin/ajv) format.

## Supported Messages

https://developers.facebook.com/docs/messenger-platform/reference/send-api/

|Message type|Implemented|
|---|---|
|[Text](https://developers.facebook.com/docs/messenger-platform/send-messages#sending_text)|:white_check_mark:|
|[Attachment](https://developers.facebook.com/docs/messenger-platform/send-messages#sending_attachments)|:white_check_mark:|
|[Quick reply: Email](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies#email)|:white_check_mark:|
|[Quick reply: Phone number](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies#phone)|:x:|
|[Quick reply: Text](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies#text)|:x:|

## References

[Understanding JSON Schema](https://json-schema.org/understanding-json-schema/index.html)
