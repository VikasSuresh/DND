const Router = require('express').Router({ mergeParams: true });

Router.get('/', require('./get'));
Router.put('/', require('./put'));

module.exports = Router;
