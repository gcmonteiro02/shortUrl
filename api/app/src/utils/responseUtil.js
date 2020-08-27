'use strict';
const commonsValidator = require('./commonsValidator');
let ErrorResponse = require('../schemas/errorResponse');
const headers = { 'Access-Control-Allow-Origin': '*' }

module.exports.errorResponse = (statusCode, error) => {
    let message = (!commonsValidator.isNull(error.message)) ? error.message : error;
    return {
        statusCode, headers, body: JSON.stringify(new ErrorResponse(message)),
    };
}
