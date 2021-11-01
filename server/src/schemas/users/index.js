const Router = require('express').Router({ mergeParams: true });
const { AuthMiddleware } = require('../../middlewares');

Router.post('/login', require('./login'));
Router.post('/register', require('./register'));

Router.get('/', AuthMiddleware, require('./get'));
Router.put('/', AuthMiddleware, require('./put'));

module.exports = Router;
