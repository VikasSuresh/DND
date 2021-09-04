const { isCelebrateError, errors } = require('celebrate');

module.exports = (err, req, res, next) => {
    try {
        if (isCelebrateError(err)) {
            return errors();
        }
        const resObj = {
            success: false,
            value: null,
            message: err.toString(),
        };

        return res.status(500).send(resObj);
    } catch (error) {
        return next(error);
    }
};
