const mongoose = require('mongoose');
const moment = require('moment');
const validator = require('./validators/put');
const { Output } = require('../../../../helpers');

const put = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const { body, params: { taskId } } = req;

        const Task = mongoose.model('task');

        const toBeUpdated = body;

        if (toBeUpdated.dueDate) {
            toBeUpdated.dueDate = moment(toBeUpdated.dueDate);
            const hours = toBeUpdated.dueDate.diff(moment(new Date()), 'hours');
            if (hours <= 3) toBeUpdated.priority = true;
        }

        const data = await Task.findOneAndUpdate({
            _id: mongoose.mongo.ObjectId(taskId),
            userId: mongoose.mongo.ObjectId(userId),
        }, {
            ...toBeUpdated,
        }, {
            upsert: false,
            new: true,
        }).lean();

        return res.status(200).send({
            success: true,
            value: Output(data),
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, put];
