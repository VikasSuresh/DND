const mongoose = require('mongoose');
const validator = require('./validators/get');
const { Generator } = require('../../helpers');

const get = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const {
            page, size, search, all, ...rest
        } = req.query;

        const { filter, sort } = Generator(rest);

        const Task = mongoose.model('task');

        const query = {
            ...filter,
            userId: mongoose.mongo.ObjectId(userId),
        };

        if (search) {
            query.name = {
                $regex: new RegExp(decodeURI(search).replace(/\s/g, '|').replace(/\./g, '\\.')),
                $options: 'i',
            };
        }

        if (all) {
            const data = await Task.find(query).sort(sort).lean();

            return res.status(200).send({
                success: true,
                values: data,
            });
        }

        const data = await Task.find(query).skip(page * size).limit(size).sort(sort)
            .lean();

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
