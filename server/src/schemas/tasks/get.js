const mongoose = require('mongoose');
const validator = require('./validators/get');

const get = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const { page, size, search } = req.query;

        const Task = mongoose.model('task');

        const query = {
            userId: mongoose.mongo.ObjectId(userId),
        };

        if (search) {
            query.name = {
                $regex: new RegExp(decodeURI(search).replace(/\s/g, '|').replace(/\./g, '\\.')),
                $options: 'i',
            };
        }

        const data = await Task.find(query).skip(page * size).limit(size).lean();

        const count = await Task.countDocuments(query).lean();

        return res.status(200).send({
            success: true,
            value: {
                page_info: {
                    page,
                    count: data.length,
                    total_count: count,
                    total_pages: Math.ceil(count / size),
                },
                values: data,
            },
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, get];
