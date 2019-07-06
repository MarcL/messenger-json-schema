const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true, jsonPointers: true});

module.exports = ajv;