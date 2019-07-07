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
|---|:---:|
|[Text](https://developers.facebook.com/docs/messenger-platform/send-messages#sending_text)|:white_check_mark:|
|[Attachment](https://developers.facebook.com/docs/messenger-platform/send-messages#sending_attachments)|:white_check_mark:|
|[Quick reply: Email](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies#email)|:white_check_mark:|
|[Quick reply: Phone number](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies#phone)|:white_check_mark:|
|[Quick reply: Text](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies#text)|:white_check_mark:|
|[Template: Generic](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic)|:x:|
|[Template: Button](https://developers.facebook.com/docs/messenger-platform/send-messages/template/button)|:x:|
|[Template: Receipt](https://developers.facebook.com/docs/messenger-platform/send-messages/template/receipt)|:x:|
|[Template: Media](https://developers.facebook.com/docs/messenger-platform/send-messages/template/media)|:x:|
|[Button: URL](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons#url)|:x:|
|[Button: Postback](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons#postback)|:x:|
|[Button: Call](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons#call)|:white_check_mark:|
|[Button: Login](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons#login)|:x:|
|[Button: Logout](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons#logout)|:x:|
|[Button: Game Play](https://developers.facebook.com/docs/messenger-platform/send-messages/buttons#game_play)|:x:|


## Notes

This schema validates against the changes from June 10, 2019.

## References

[Understanding JSON Schema](https://json-schema.org/understanding-json-schema/index.html)
[Messenger Changelog](https://developers.facebook.com/docs/messenger-platform/changelog/)
