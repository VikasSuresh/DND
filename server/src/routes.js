const Router = require('express').Router();

const { Tasks } = require('./schemas');

Router.get('/', require('./index'));

Router.use('/tasks', Tasks);

module.exports = Router;
