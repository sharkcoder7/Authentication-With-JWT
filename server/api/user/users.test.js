import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import request from 'supertest';

import app from '../../app';
import User from './models/User';
import { users, populateUsers } from '../../test/seed/seed';

beforeEach(populateUsers);

afterAll(() => {
  mongoose.disconnect();
});
describe('POST users/', () => {
  it('it should create a new user', async () => {
    const user = {
      email: 'aphrodite4@test.com',
      password: 'testPasword',
    };
    await request(app)
      .post('/users')
      .send(user)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeDefined();
        expect(res.body.email).toBe(user.email);
        expect(res.body.password).toBeUndefined();
        expect(res.body._id).toBeDefined();
      });
  });

  it('it should hash the password', async () => {
    const mockUser = {
      email: 'aphrodite5@test.com',
      password: 'testPasword',
    };
    await request(app)
      .post('/users')
      .send(mockUser)
      .expect(HttpStatus.OK);
    await User.findOne({ email: mockUser.email }).then((user) => {
      expect(user).toBeDefined();
      expect(user.password).not.toBe(mockUser.password);
    });
  });

  it('it should reject if email already exist', async () => {
    const user = {
      email: 'aphrodite@test.com',
      password: 'testPasword',
    };
    await request(app)
      .post('/users')
      .send(user)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.email).toBeUndefined();
        expect(res.body.password).toBeUndefined();
        expect(res.body.code).toBe(HttpStatus.BAD_REQUEST);
      });
  });

  it('it should reject if password not long enough', async () => {
    const user = {
      email: 'aphrodite6@test.com',
      password: 'test',
    };
    await request(app)
      .post('/users')
      .send(user)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.email).toBeUndefined();
        expect(res.body.password).toBeUndefined();
        expect(res.body.code).toBe(HttpStatus.BAD_REQUEST);
      });
  });

  it('it should reject if email is not valid', async () => {
    const user = {
      email: 'aphrodite.com',
      password: 'testPasword',
    };
    await request(app)
      .post('/users')
      .send(user)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.email).toBeUndefined();
        expect(res.body.password).toBeUndefined();
        expect(res.body.code).toBe(HttpStatus.BAD_REQUEST);
      });
  });
});

describe('GET users/me', () => {
  it('should return user if authenticated', async () => {
    const user = users[0];
    await request(app)
      .get('/users/me')
      .set('x-auth', user.tokens[0].token)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body._id).toBe(user._id.toHexString());
        expect(res.body.email).toBe(user.email);
      });
  });

  it('should return 401 if token access is wrong', async () => {
    const user = users[1];
    await request(app)
      .get('/users/me')
      .set('x-auth', user.tokens[0].token)
      .expect(HttpStatus.UNAUTHORIZED)
      .expect((res) => {
        expect(res.body.errorCodeMessage).toBe('Unauthorized');
      });
  });

  it('should return 401 if token is malformed', async () => {
    const user = users[2];
    await request(app)
      .get('/users/me')
      .set('x-auth', user.tokens[0].token)
      .expect(HttpStatus.UNAUTHORIZED)
      .expect((res) => {
        expect(res.body.errorCodeMessage).toBe('Unauthorized');
      });
  });

  it('should return 401 if no token', async () => {
    const user = users[2];
    await request(app)
      .get('/users/me')
      .set('x-auth', user.tokens[0].token)
      .expect(HttpStatus.UNAUTHORIZED)
      .expect((res) => {
        expect(res.body.errorCodeMessage).toBe('Unauthorized');
      });
  });
});

describe('GET users/login', () => {
  it('should login user and return auth token', async () => {
    const body = {
      email: users[0].email,
      password: users[0].password,
    };
    await request(app)
      .post('/users/login')
      .send(body)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeDefined();
        expect(res.body.email).toBe(body.email);
        expect(res.body.password).toBeUndefined();
        expect(res.body._id).toBeDefined();
      });
  });

  it('should reject invalid login with no email', async () => {
    const body = {
      email: '',
      password: users[0].password,
    };
    await request(app)
      .post('/users/login')
      .send(body)
      .expect(HttpStatus.UNAUTHORIZED)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeUndefined();
        expect(res.body.code).toBe(HttpStatus.UNAUTHORIZED);
      });
  });

  it('should reject invalid login with too short password', async () => {
    const body = {
      email: users[0].email,
      password: 'test',
    };
    await request(app)
      .post('/users/login')
      .send(body)
      .expect(HttpStatus.UNAUTHORIZED)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeUndefined();
        expect(res.body.code).toBe(HttpStatus.UNAUTHORIZED);
      });
  });

  it('should reject invalid login with wrong password', async () => {
    const body = {
      email: users[0].email,
      password: 'testPassword',
    };
    await request(app)
      .post('/users/login')
      .send(body)
      .expect(HttpStatus.UNAUTHORIZED)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeUndefined();
        expect(res.body.code).toBe(HttpStatus.UNAUTHORIZED);
      });
  });
});
