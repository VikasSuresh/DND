const { Segments, Joi, celebrate } = require('celebrate');

module.exports = celebrate({
    [ Segments.PARAMS ]: Joi.object({
        userId: Joi.string().hex().length(24).required(),
    }),
});
