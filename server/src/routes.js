const Router = require('express').Router();

const { Tasks } = require('./schema');

Router.get('/', require('./index'));

Router.use('/tasks', Tasks);

module.exports = Router;
