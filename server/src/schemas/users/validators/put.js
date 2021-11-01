const { Segments, Joi, celebrate } = require('celebrate');

module.exports = celebrate({
    [ Segments.BODY ]: Joi.object({
        name: Joi.string(),
        password: Joi.string(),
        img: Joi.string(),
    }).required(),
});
