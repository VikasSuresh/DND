const Router = require('express').Router({ mergeParams: true });
const { AuthMiddleware } = require('../../middlewares');

const { UserId } = require('./schemas');

Router.post('/', require('./login'));
Router.post('/', require('./register'));

Router.use('/:userId', AuthMiddleware, UserId);

module.exports = Router;
