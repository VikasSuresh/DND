const mongoose = require('mongoose');
const validator = require('./validators/put');

const put = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const { body, params: { taskId } } = req;

        const Task = mongoose.model('task');

        const toBeUpdated = body;

        if (toBeUpdated.dueDate) {
            let delta = Math.abs(new Date(toBeUpdated.dueDate) - new Date()) / 1000;
            const hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            if (delta <= 3) toBeUpdated.priority = true;
        }

        const data = await Task.findOneAndUpdate({
            _id: mongoose.mongo.objectId(taskId),
            userId: mongoose.mongo.objectId(userId),
        }, {
            ...toBeUpdated,
        }, {
            upsert: false,
            new: true,
        }).lean();

        return res.status(200).send({
            success: true,
            value: data.toObject(),
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, put];
