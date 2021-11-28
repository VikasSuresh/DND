const { Segments, Joi, celebrate } = require('celebrate');

module.exports = celebrate({
    [ Segments.QUERY ]: Joi.object({
        page: Joi.number().default(0),
        size: Joi.number().default(10),
        all: Joi.bool().default(false),
        search: Joi.string().allow(''),
        filter: Joi.string(),
        sort: Joi.string().allow(''),
        duration: Joi.string(),
    }),
});
