const { Segments, Joi, celebrate } = require('celebrate');

module.exports = celebrate({
    [ Segments.BODY ]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
});
