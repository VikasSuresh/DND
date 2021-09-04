const { Segments, Joi, celebrate } = require('celebrate');

module.exports = celebrate({
    [ Segments.PARAMS ]: Joi.object({
        taskId: Joi.string().hex().length(24).required(),
    }),
    [ Segments.BODY ]: Joi.object({
        name: Joi.string(),
        bookmarked: Joi.boolean(),
        completed: Joi.boolean(),
        priority: Joi.boolean(),
        dueDate: Joi.date(),
    }).required(),
});
