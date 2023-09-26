'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const Users = require('../models/users-model');


module.exports.basicAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization header missing');
    }

    const basicHeaderParts = req.headers.authorization.split(' ');
    const encodedString = basicHeaderParts.pop();
    const decodedString = base64.decode(encodedString);
    const [username, password] = decodedString.split(':');

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      throw new Error('Invalid User');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid Password');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
};
