const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/userModel');

beforeAll(async () => {
  await User.deleteMany({});
});

describe('User Routes', () => {
  describe('POST /api/users/signup', () => {
    it('should signup a new user with valid credentials', async () => {
      // Arrange
      const userData = {
        name: 'Mikko33 Seppänen',
        username: 'Mikko3',
        password: 'Juuso@45mtg$',
        phone_number: 'Mannerheimintie 14, 00100 Helsinki',
        gender: 'male',
        date_of_birth: '2000-02-23',
        membership_status: 'true',
        bio: 'juu',
        address: 'dfghj',
        profile_picture: 'sfghbs',
      };

      // Act
      const response = await api.post('/api/users/signup').send(userData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    it('should return an error with invalid credentials', async () => {
      // Arrange
      const userData = {
        username: 'Mikko3',
        password: 'invalidpassword',
      };

      // Act
      const response = await api.post('/api/users/signup').send(userData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login a user with valid credentials', async () => {
      // Arrange
      const userData = {
        username: 'Mikko3',
        password: 'Juuso@45mtg$',
      };

      // Act
      const response = await api.post('/api/users/login').send(userData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return an error with invalid credentials', async () => {
      // Arrange
      const userData = {
        username: 'Mikko3',
        password: 'invalidpassword',
      };

      // Act
      const response = await api.post('/api/users/login').send(userData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
