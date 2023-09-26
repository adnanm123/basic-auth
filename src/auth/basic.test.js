const supertest = require('supertest');
const { app } = require('../server'); // Import your Express app instance

describe('Basic Auth Middleware Tests', () => {
  it('should hash the password for /signup route', async () => {
    const res = await supertest(app)
      .post('/signup')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    // Add your assertions here
  });

  it('should extract username and password from the basic auth header for /signin route', async () => {
    const validBase64 = Buffer.from('testuser:testpassword').toString('base64');
    const res = await supertest(app)
      .post('/signin')
      .set('Authorization', `Basic ${validBase64}`);

    // Add your assertions here
  });

  it('should return 401 for missing basic auth header', async () => {
    const res = await supertest(app).post('/signup').send({});

    // Add your assertions here
  });

  it('should return 401 for incorrect basic auth header', async () => {
    const res = await supertest(app)
      .post('/signup')
      .set('Authorization', 'Basic invalidbase64')
      .send({});

    // Add your assertions here
  });

  it('should return 200 OK for correct basic auth header', async () => {
    const validBase64 = Buffer.from('testuser:testpassword').toString('base64');
    const res = await supertest(app)
      .post('/signup')
      .set('Authorization', `Basic ${validBase64}`)
      .send({});

    // Add your assertions here
  });

  it('should call next with "Incorrect path chosen" for an incorrect route', async () => {
    const res = await supertest(app).get('/invalidroute');

    // Add your assertions here
  });
});
