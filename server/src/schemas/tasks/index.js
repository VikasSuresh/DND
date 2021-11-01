const Router = require('express').Router({ mergeParams: true });

const { TaskId } = require('./schemas');

Router.get('/', require('./get'));
Router.post('/', require('./post'));
Router.get('/aggregated', require('./aggregated'));

Router.use('/:taskId', TaskId);

module.exports = Router;
