const Router = require('express').Router({ mergeParams: true });

Router.get('/', require('./get'));

module.exports = Router;
