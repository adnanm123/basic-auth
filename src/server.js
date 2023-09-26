'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');
const { Sequelize } = require('sequelize'); // Import Sequelize


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define and configure your Sequelize instance
const sequelize = new Sequelize({
  database: 'your_database_name', // Replace with your actual database name
  username: 'your_database_username', // Replace with your actual database username
  password: 'your_database_password', // Replace with your actual database password
  host: 'localhost',
  dialect: 'postgres', // Change to your database dialect if not PostgreSQL
});


// Export the sequelize instance
module.exports = {
  app,
  sequelize, // Export sequelize along with app
};

// Routes
app.use('/auth', require('./auth/router'));

app.use('*', notFoundHandler);
app.use(errorHandler);

// Sync the database and start the server
sequelize.sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log('Database synchronized. Server is running on port', PORT);
    });
  })
  .catch((err) => {
    console.error('Database synchronization failed:', err);
  });

  