import request from 'supertest';
import app from '../src/app';

describe('User Registration', () => {
  it('should returns 200 OK when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'PassWord!',
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('should returns success message when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'PassWord!',
      })
      .then((response) => {
        expect(response.body.message).toBe('User created');
        done();
      });
  });
});
