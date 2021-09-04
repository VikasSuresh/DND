const Router = require('express').Router({ mergeParams: true });

Router.get('/', require('./get'));
Router.put('/', require('./put'));
Router.delete('/', require('./delete'));

module.exports = Router;
