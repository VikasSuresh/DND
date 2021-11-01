const mongoose = require('mongoose');
const validator = require('./validators/get');
const { Output } = require('../../../../helpers');

const get = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const { taskId } = req.params;

        const Task = mongoose.model('Task');

        const query = {
            _id: mongoose.mongo.ObjectId(taskId),
            userId: mongoose.mongo.ObjectId(userId),
        };

        const data = await Task.findOne(query).lean();

        return res.status(200).send({
            success: true,
            value: Output(data),
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, get];
