const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('./validators/put');

const put = async (req, res, next) => {
    try {
        const saltRounds = 10;

        const { userId } = req.params;

        const { name, password } = req.body;

        const User = mongoose.model('User');

        const update = {};

        if (name) {
            update.name = name;
        }

        if (password) {
            update.password = await bcrypt.hash(password, saltRounds);
        }

        await User.updateOne({
            _id: mongoose.mongo.ObjectId(userId),
        }, update,
        {
            upsert: false,
        });

        return res.status(200).send({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, put];
