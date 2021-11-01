const fs = require('fs');
const path = require('path');

const moment = require('moment');
const jwt = require('jsonwebtoken');

const options = require('./options');

module.exports = (payload) => {
    const time = new Date().getTime();
    const end = moment(time).add(7, 'days');
    const expiresIn = moment(time).diff(end, 'milliseconds');
    const privateKey = fs.readFileSync(path.join(__dirname, '.rsa', 'private.pem'));
    const jwtOptions = options(expiresIn);
    const token = jwt.sign({
        ...payload,
        iat: time,
    }, privateKey, jwtOptions);
    return { token, expiry: end.valueOf() };
};
