const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('./validators/register');

const register = async (req, res, next) => {
    try {
        const saltRounds = 10;

        const { name, email, password } = req.body;

        const User = mongoose.model('User');

        const emailExist = await User.findOne({
            email: email.toLowerCase(),
        });

        if (emailExist) {
            return res.status(409).send({
                success: false,
                value: null,
                message: 'Email Already Exists',
            });
        }

        const encryptedPassword = await bcrypt.hash(password, saltRounds);

        const data = new User({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        await data.save();

        return res.status(200).send({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, register];
