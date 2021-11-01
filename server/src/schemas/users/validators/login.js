const { Segments, Joi, celebrate } = require('celebrate');

module.exports = celebrate({
    [ Segments.QUERY ]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
});
