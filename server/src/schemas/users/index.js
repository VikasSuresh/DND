const Router = require('express').Router({ mergeParams: true });

const { TaskId } = require('./schemas');

Router.post('/', require('./login'));
Router.post('/', require('./register'));

Router.use('/:taskId', TaskId);

module.exports = Router;
