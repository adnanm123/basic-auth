'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const basicAuth = require('../auth/middleware/basic');
const { sequelize } = require('../server');
const Users = require('../auth/models/users-model');

describe('Basic Authentication Middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 403 status with "Authorization header missing" message when Authorization header is missing', async () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    await basicAuthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Authorization header missing');
    expect(next).not.toHaveBeenCalled();
  });

  it('should set req.user and call next() when valid credentials are provided', async () => {
    // Create a mock user and hashed password for testing
    const mockUser = { username: 'testuser', password: await bcrypt.hash('testpassword', 10) };
    jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);
  
    const req = {
      headers: { authorization: 'Basic ' + base64.encode('testuser:testpassword') },
    };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
  
    await basicAuth(req, res, next); // Use basicAuth middleware function directly here
  
    expect(Users.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });
  

  it('should return a 403 status with "Invalid User" message when provided username is invalid', async () => {
    jest.spyOn(Users, 'findOne').mockResolvedValue(null);

    const req = {
      headers: { authorization: 'Basic ' + base64.encode('nonexistentuser:testpassword') },
    };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    await basicAuthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Invalid User');
    expect(next).not.toHaveBeenCalled();
  });

  it('should return a 403 status with "Invalid Password" message when provided password is invalid', async () => {
    // Create a mock user with a hashed password
    const mockUser = { username: 'testuser', password: await bcrypt.hash('testpassword', 10) };
    jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);
  
    const req = {
      headers: { authorization: 'Basic ' + base64.encode('testuser:wrongpassword') },
    };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
  
    await basicAuthMiddleware(req, res, next);
  
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Invalid Password');
    expect(next).not.toHaveBeenCalled();
  });
});
