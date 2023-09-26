const request = require('supertest');
const { app, sequelize} = require('../src/server'); // Update the path to match your file structure

describe('Authentication Routes', () => {
  describe('POST /auth/signup', () => {
    xit('should create a new user', async () => {
      const userData = {
        username: 'testuser',
        password: 'testpassword',
      };
    
      const response = await request(app)
        .post('/auth/signup')
        .send(userData)
        .expect(201);
    
      console.log('Response Body:', response.body); // Log the response body
      console.log('Response Status:', response.status); // Log the response status code
    
      expect(response.body).toHaveProperty('testpassword', 'testuser');
      // You can add more assertions as needed
    });
    

    it('should return an error for invalid input', async () => {
      const invalidUserData = {
        // Missing required fields or invalid data
      };

      const response = await request(app)
        .post('/auth/signup')
        .send(invalidUserData)
        .expect(403);

      if (response.text !== 'Error Creating User') {
        throw new Error('Test failed: Invalid error response');
      }
      // Add more assertions as needed
    });
  });

  describe('POST /auth/signin', () => {
    xit('should allow a user to sign in', async () => {
      const userData = {
        username: 'testuser',
        password: 'testpassword',
      };

      // Create a user account for testing
      // You can use your Sequelize model to create a user here

      const response = await request(app)
        .post('/auth/signin')
        .set('Authorization', `Basic ${Buffer.from('testuser:testpassword').toString('base64')}`)
        .expect(200);

      if (!response.body || response.body.username !== 'testuser') {
        throw new Error('Test failed: User not authenticated');
      }
      // Add more assertions as needed
    });

    it('should return an error for invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/signin')
        .set('Authorization', 'Basic invalidcredentials')
        .expect(403);

      if (response.text !== 'Invalid Login') {
        throw new Error('Test failed: Invalid error response');
      }
      // Add more assertions as needed
    });
  });
});
