const { Segments, Joi, celebrate } = require('celebrate');

module.exports = celebrate({
    [ Segments.PARAMS ]: Joi.object({
        userId: Joi.string().hex().length(24).required(),
    }),
    [ Segments.BODY ]: Joi.object({
        name: Joi.string(),
        password: Joi.string(),
    }).required(),
});
