const { Joi } = require('celebrate');
const moment = require('moment');

const validDate = (date) => {
    const dateCheck = Joi.date().timestamp('unix');

    const { error } = dateCheck.validate(date);

    if (error) return new Date(moment(new Date()).endOf('day'));

    return date;
};

module.exports = (others) => {
    let { filter, sort } = others;

    const allowed = ['completed', 'bookmarked', 'priority', 'expired', 'dueDate', 'start', 'updatedAt'];

    if (filter) {
        filter = filter.split(',');
        filter = filter.reduce((a, c) => {
            const split = c.split(':');

            if (!allowed.includes(split[ 0 ])) return a;

            if (split[ 0 ] === 'dueDate') {
                return {
                    ...a,
                    dueDate: {
                        ...a.dueDate,
                        [ ['gte', 'gt', 'lte', 'eq'].includes(split[ 1 ]) ? `$${ split[ 1 ] }` : '$lt' ]: validDate(split[ 2 ]),
                    },
                };
            }
            return {
                ...a, [ split[ 0 ] ]: split[ 1 ] !== 'false',
            };
        }, {});
    }
    if (sort) {
        sort = sort.split(',');
        sort = sort.reduce((a, c) => {
            const split = c.split(':');
            if (!allowed.includes(split[ 0 ])) return a;

            return {
                ...a, [ split[ 0 ] ]: split[ 1 ] === 'asc' ? 1 : -1,
            };
        }, {});
    }
    return { filter, sort };
};
