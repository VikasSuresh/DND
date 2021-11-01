const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 512,
});

const privateKEY = privateKey.export({
    type: 'pkcs1',
    format: 'pem',
}).toString();

const publicKEY = publicKey.export({
    type: 'pkcs1',
    format: 'pem',
}).toString();

fs.writeFileSync(path.join(__dirname, '../src/jwt/.rsa/private.pem'), privateKEY);
fs.writeFileSync(path.join(__dirname, '../src/jwt/.rsa/public.pem'), publicKEY);
