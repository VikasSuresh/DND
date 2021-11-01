const Router = require('express').Router();

const { AuthMiddleware } = require('./middlewares');

const { Tasks, Users } = require('./schemas');

Router.get('/', require('./index'));

Router.use('/tasks', AuthMiddleware, Tasks);
Router.use('/users', Users);

module.exports = Router;
