'use strict';

const express = require('express');
const cors = require('cors');
const basicAuth = require('./auth/middleware/basic');
const app = express();
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');
const { handleSignup, handleSignin} = require('./auth/router.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.post('/signup', basicAuth, handleSignup);
app.post('/signin', basicAuth, handleSignin);

app.use('*', notFoundHandler);
app.use(errorHandler);

// start the server
module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log('Express now running on port:', port);
    });
  }
}
  