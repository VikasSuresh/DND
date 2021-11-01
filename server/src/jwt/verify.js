const fs = require('fs');
const path = require('path');

const jwt = require('jsonwebtoken');

const options = require('./options');

module.exports = (token) => {
    const publicKey = fs.readFileSync(path.join(__dirname, '.rsa', 'public.pem'));
    const payload = jwt.verify(token, publicKey, options(null));
    return payload;
};
