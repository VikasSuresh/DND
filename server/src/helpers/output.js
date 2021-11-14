const moment = require('moment');

module.exports = (val) => {
    if (!val) return null;
    if (Array.isArray(val)) {
        return val.map((el) => genDateString(el));
    }
    return genDateString(val);
};

function genDateString(val) {
    const { dueDate } = val;
    const seconds = moment(dueDate).diff(new Date(), 'seconds');
    if (seconds <= 0) {
        return {
            ...val, expired: true, dueDate: moment(dueDate).format('llll'), end: dueDate,
        };
    }
    if (seconds > 0 && seconds <= 86400) {
        return {
            ...val, expired: false, dueDate: 'Today', end: dueDate,
        };
    }
    if (seconds > 86400 && seconds <= 172800) {
        return {
            ...val, expired: false, dueDate: 'Tomorrow', end: dueDate,
        };
    }
    return {
        ...val, expired: false, dueDate: moment(dueDate).format('llll'), end: dueDate,
    };
}
