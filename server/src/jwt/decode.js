const jwt = require('jsonwebtoken');

const options = require('./options');

module.exports = (token) => jwt.decode(token, options(null));
