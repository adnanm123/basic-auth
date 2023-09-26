# Basic Authentication

This assignment involves building a basic authentication API using Node.js, Express.js, and Sequelize, with a focus on creating and testing user authentication and authorization.

## Assignment Overview

In this assignment, you will create an API that allows users to sign up and sign in using basic authentication. Basic authentication involves sending a username and password in the HTTP request headers, which the server will use to authenticate the user.

### Features

- **User Sign-Up**: Users can create an account by providing a username and password. The password should be securely hashed before storing it in the database.

- **User Sign-In**: Registered users can sign in using their username and password. The server will validate the credentials and issue a token upon successful authentication.

- **Middleware**: Implement middleware functions to handle basic authentication and protect routes that require authentication.

- **Database Integration**: Use Sequelize to interact with a PostgreSQL database for storing user information securely.

- **Testing**: Write comprehensive unit tests for the authentication middleware to ensure that it functions correctly.

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository to your local machine:

Install project dependencies:

   ```bash
   git clone https://github.com/yourusername/authentication-api.git
   ```

Configure the database connection in the server.js file. Replace the placeholder values with your actual database credentials.

Run the server:

npm start

Run the tests:

npm test

## Project Structure

The project structure is organized as follows:

- src/: Contains the source code for the API.
- auth/: Authentication-related files, including models, middleware, and routes.
- middleware/: Custom middleware functions for handling authentication.
- models/: Sequelize models for interacting with the database.
- server.js: The main application file.
- __tests__/: Contains unit tests for the authentication middleware.
- README.md: This README file.

[Deployed Link](https://adnan-basic-auth.onrender.com)
