'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../server'); // Ensure the path to your server.js is correct
const bcrypt = require('bcrypt');

const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = Users;
