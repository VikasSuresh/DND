require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { ErrorMiddleware } = require('./middlewares');

require('./model');

app.use(
    cors(
        {
            origin: (origin, callback) => {
                if (origin && origin.toLowerCase() === process.env.DOMAIN) {
                    return callback(null, true);
                }
                return callback(new Error('Not allowed by CORS'));
            },
            credentials: true,
        },
    ),
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/', require('./routes'));

app.use(ErrorMiddleware);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected');
    }).catch((err) => {
        console.log(err);
    });

module.exports = app;
