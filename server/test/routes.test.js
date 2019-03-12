import HttpStatus from 'http-status-codes';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

afterAll(() => {
  mongoose.disconnect();
});

describe('GET /', () => {
  it('should render properly', async () => {
    await request(app).get('/').expect(HttpStatus.OK);
  });
});

describe('GET /list', () => {
  it('should render properly with valid parameters', async () => {
    await request(app)
      .get('/list')
      .query({ title: 'List title' })
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should error without a valid parameter', async () => {
    await request(app).get('/list').expect(HttpStatus.NOT_FOUND);
  });
});

describe('GET /404', () => {
  it('should return 404 for non-existent URLs', async () => {
    await request(app).get('/404').expect(HttpStatus.NOT_FOUND);
    await request(app).get('/notfound').expect(HttpStatus.NOT_FOUND);
  });
});

