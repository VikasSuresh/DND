const mongoose = require('mongoose');
const validator = require('./validators/post');

const post = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const { body } = req;

        const Task = mongoose.model('task');

        let delta;

        if (body.dueDate) {
            delta = Math.abs(new Date(body.dueDate) - new Date()) / 1000;
            const hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
        }

        const data = new Task({
            ...body,
            priority: delta <= 3 ? true : body.priority,
            userId: mongoose.mongo.ObjectId(userId),
        });

        await data.save();

        return res.status(200).send({
            success: true,
            value: data.toObject(),
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, post];
