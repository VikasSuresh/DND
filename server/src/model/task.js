const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bookmarked: {
        type: Boolean,
    },
    completed: {
        type: Boolean,
    },
    priority: {
        type: Boolean,
    },
    dueDate: {
        type: Date,
        default: () => new Date(new Date().setUTCHours(23, 59, 59, 999)),
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = {
    Task: mongoose.model('task', schema),
};
