const mongoose = require('mongoose');

const aggregated = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const Task = mongoose.model('Task');

        const data = await Task.aggregate([
            {
                $match: {
                    userId: mongoose.mongo.ObjectId(userId),
                },
            },
            {
                $facet: {
                    Completed: [
                        {
                            $match: {
                                completed: true,
                            },
                        },
                        { $project: { _id: true } },
                    ],
                    NotCompleted: [
                        {
                            $match: {
                                completed: false,
                            },
                        },
                        { $project: { _id: true } },
                    ],
                    Prioritized: [
                        {
                            $match: {
                                priority: true,
                            },
                        },
                        { $project: { _id: true } },
                    ],
                    NotPrioritized: [
                        {
                            $match: {
                                priority: false,
                            },
                        },
                        { $project: { _id: true } },
                    ],
                    Expired: [
                        {
                            $match: {
                                dueDate: {
                                    $lte: new Date(),
                                },
                            },
                        },
                        { $project: { _id: true } },
                    ],
                    NotExpired: [
                        {
                            $match: {
                                dueDate: {
                                    $gt: new Date(),
                                },
                            },
                        },
                        { $project: { _id: true } },
                    ],
                },
            },
        ]);

        return res.status(200).send({
            success: true,
            value: Object.entries(data[ 0 ]).reduce((a, [k, v]) => ({ ...a, [ k ]: v.length }), {}),
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = aggregated;
