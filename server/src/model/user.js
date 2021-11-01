const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = {
    User: mongoose.model('User', schema),
};
