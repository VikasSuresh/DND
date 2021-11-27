const mongoose = require('mongoose');
const moment = require('moment');
const validator = require('./validators/get');
const { Generator } = require('../../helpers');
const { Output } = require('../../helpers');

const get = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const {
            page, size, search, month, ...rest
        } = req.query;

        const { filter, sort } = Generator(rest);

        const Task = mongoose.model('Task');

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

        if (month) {
            const start = moment(month).startOf('month');
            const end = moment(month).endOf('month');

            const data = await Task
                .find({
                    ...query,
                    $or: [
                        {
                            start: {
                                $gte: start,
                                $lte: end,
                            },
                        },
                        {
                            end: {
                                $gte: start,
                                $lte: end,
                            },
                        },
                    ],
                })
                .lean();
            return res.status(200).send({
                success: true,
                value: {
                    values: Output(data),
                },
            });
        }

        const data = await Task.find(query).skip(page * size).limit(size).sort(sort)
            .lean();

        const count = await Task.countDocuments(query).lean();

        return res.status(200).send({
            success: true,
            value: {
                pageInfo: {
                    page,
                    count: data.length,
                    totalCount: count,
                    totalPages: Math.ceil(count / size),
                },
                values: Output(data),
            },
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, get];
