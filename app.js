const express = require('express');
const { get } = require('http');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

// first middleware
app.use((req, res, next) => {
  // console.log('Hello, world!');
  (req.requestTime = new Date()).toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// tours routes

module.exports = app;
