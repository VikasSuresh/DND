const mongoose = require('mongoose');
const moment = require('moment');
const validator = require('./validators/post');

const post = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const { body } = req;

        const Task = mongoose.model('task');

        const date = {};

        if (body.dueDate) {
            date.dueDate = moment(body.dueDate);
            const hours = date.dueDate.diff(moment(new Date()), 'hours');
            if (hours <= 0) throw new Error('Wrong Date');
            date.priority = hours <= 3 ? true : body.priority;
        }

        const data = new Task({
            ...body,
            ...date,
            userId: mongoose.mongo.ObjectId(userId),
        });

        // await data.save();

        return res.status(200).send({
            success: true,
            value: data.toObject(),
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, post];
