const moment = require('moment');
const { Segments, Joi, celebrate } = require('celebrate');

module.exports = celebrate({
    [ Segments.BODY ]: Joi.object({
        name: Joi.string().required(),
        bookmarked: Joi.boolean().default(false),
        completed: Joi.boolean().default(false),
        priority: Joi.boolean().default(false),
        dueDate: Joi.date().default(moment(new Date()).endOf('day')),
    }).required(),
});
