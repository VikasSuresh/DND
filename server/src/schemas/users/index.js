const Router = require('express').Router({ mergeParams: true });
const { AuthMiddleware } = require('../../middlewares');

const { UserId } = require('./schemas');

Router.post('/login', require('./login'));
Router.post('/register', require('./register'));

Router.use('/:userId', AuthMiddleware, UserId);

module.exports = Router;
