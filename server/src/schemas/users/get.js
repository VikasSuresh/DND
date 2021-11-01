const mongoose = require('mongoose');

const get = async (req, res, next) => {
    try {
        const { userId } = req.state;

        const User = mongoose.model('User');

        const query = {
            _id: mongoose.mongo.ObjectId(userId),
        };

        const data = await User.findOne(query).lean();

        const { password, ...rest } = data;

        return res.status(200).send({
            success: true,
            value: rest,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = get;
