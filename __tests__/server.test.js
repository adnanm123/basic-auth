const request = require('supertest');
const { app } = require('../src/server'); // Import your Express app instance

describe('Server Tests', () => {
  // Test for POST /signup
  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/signup')
        .send({
          username: 'testuser',
          password: 'testpassword',
        });

      console.assert(res.status === 200, 'Expected status code 200');
      // Add more assertions to check the response body or database state if needed
    });

    // Add more tests for various scenarios (e.g., missing username, invalid input, etc.)
  });

  // Test for POST /signin
  describe('POST /signin', () => {
    it('should login a user with valid credentials', async () => {
      const res = await request(app)
        .post('/signin')
        .auth('testuser', 'testpassword'); // Use basic auth for signin

      console.assert(res.status === 200, 'Expected status code 200');
      // Add more assertions to check the response body or user authentication
    });

    it('should return 401 unauthorized for invalid credentials', async () => {
      const res = await request(app)
        .post('/signin')
        .auth('testuser', 'invalidpassword'); // Use basic auth for signin

      console.assert(res.status === 401, 'Expected status code 401');
    });

    // Add more tests for various scenarios (e.g., missing credentials, incorrect format, etc.)
  });

  // Test for auth middleware
  describe('Auth Middleware', () => {
    it('should return 401 unauthorized for missing basic auth header', async () => {
      const res = await request(app).post('/signup').send({});
      console.assert(res.status === 401, 'Expected status code 401');
    });

    it('should return 401 unauthorized for incorrect basic auth header', async () => {
      const res = await request(app)
        .post('/signup')
        .set('Authorization', 'Basic invalidbase64')
        .send({});
      
      console.assert(res.status === 401, 'Expected status code 401');
    });

    it('should return 200 OK for correct basic auth header', async () => {
      const validBase64 = Buffer.from('testuser:testpassword').toString('base64');
      const res = await request(app)
        .post('/signup')
        .set('Authorization', `Basic ${validBase64}`)
        .send({});
      
      console.assert(res.status === 200, 'Expected status code 200');
    });

    // Add more tests for various scenarios (e.g., missing credentials, incorrect format, etc.)
  });
});
