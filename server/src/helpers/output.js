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
    const date = moment(dueDate).diff(new Date(), 'days');
    if (date < 0) return { ...val, expired: true, dueDate: moment(dueDate).format('llll') };
    if (date === 0) return { ...val, expired: false, dueDate: 'Today' };
    if (date === 1) return { ...val, expired: false, dueDate: 'Tomorrow' };
    return { ...val, expired: false, dueDate: moment(dueDate).format('llll') };
}
