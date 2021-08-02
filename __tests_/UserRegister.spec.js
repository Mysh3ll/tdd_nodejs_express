import request from 'supertest';
import app from '../src/app';
import User from '../src/user/model/user';
import { sequelize } from '../src/config/database';

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

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

  it('should saves the user to database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'PassWord!',
      })
      .then(() => {
        User.findAll().then((userList) => {
          expect(userList.length).toBe(1);
          done();
        });
      });
  });

  it('should saves the username and email to database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'PassWord!',
      })
      .then(() => {
        User.findAll().then((userList) => {
          const { username, email } = userList[0];
          expect(username).toBe('user1');
          expect(email).toBe('user1@mail.com');
          done();
        });
      });
  });

  it('should hashes the password in database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'PassWord!',
      })
      .then(() => {
        User.findAll().then((userList) => {
          const { password } = userList[0];
          expect(password).not.toBe('PassWord!');
          done();
        });
      });
  });
});
