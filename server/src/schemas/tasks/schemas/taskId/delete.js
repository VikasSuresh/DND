const mongoose = require('mongoose');
const validator = require('./validators/delete');

const del = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const { taskId } = req.params;

        const Task = mongoose.model('task');

        const query = {
            _id: mongoose.mongo.ObjectId(taskId),
            userId: mongoose.mongo.ObjectId(userId),
        };

        await Task.deleteOne(query).lean();

        return res.status(200).send({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, del];
