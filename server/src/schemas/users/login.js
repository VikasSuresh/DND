const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { sign } = require('../../jwt');
const validator = require('./validators/login');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const User = mongoose.model('User');

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(404).send({
                success: false,
                value: null,
                message: 'User Not Found!',
            });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(403).send({
                success: false,
                value: null,
                message: 'Invalid Password!',
            });
        }

        const payload = {
            token: 'Cookie',
            sub: user._id,
            email: user.email,
            name: user.name,
        };

        const { token, expiry } = sign(payload);

        return res.cookie('DSID', token, {
            expires: new Date(expiry),
            httpOnly: true,
            secure: true,
        }).end();
    } catch (error) {
        return next(error);
    }
};

module.exports = [validator, login];
