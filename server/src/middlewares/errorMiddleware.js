const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
    try {
        const resObj = {
            success: false,
            value: null,
            message: err.message,
        };

        if (isCelebrateError(err)) {
            resObj.message = 'Wrong Data';
        }

        return res.status(500).send(resObj);
    } catch (error) {
        return next(error);
    }
};
