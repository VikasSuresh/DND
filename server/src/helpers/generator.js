const { Joi } = require('celebrate');
const moment = require('moment');

const validDate = (date) => {
    const dateCheck = Joi.date();

    const { error } = dateCheck.validate(date);

    if (error) return new Date(moment(new Date()).endOf('day'));

    return new Date(moment(date).endOf('day'));
};

module.exports = (others) => {
    let { filter, sort } = others;

    if (filter) {
        filter = filter.split(',');
        filter = filter.reduce((a, c) => {
            const split = c.split('_');
            if (split[ 0 ] === 'date') {
                return {
                    ...a,
                    dueDate: {
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
        sort = sort.reduce((a, c) => ({ ...a, [ c.split('_')[ 0 ] ]: c.split('_')[ 1 ] === 'asc' ? 1 : -1 }), {});
    }

    if (sort.date) {
        sort.dueDate = sort.date;
        delete sort.date;
    }

    return { filter, sort };
};
