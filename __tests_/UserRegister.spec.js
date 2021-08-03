import request from 'supertest';
import app from '../src/app';
import User from '../src/user/model';
import { sequelize } from '../src/config/database';

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

const validUser = {
  username: 'user1',
  email: 'user1@mail.com',
  password: 'PassWord!',
};

const postUser = (user = validUser) => {
  return request(app).post('/api/1.0/users').send(user);
};

describe('User Registration', () => {
  it('should returns 200 OK when signup request is valid', async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
  });

  it('should returns success message when signup request is valid', async () => {
    const response = await postUser();
    expect(response.body.message).toBe('User created');
  });

  it('should saves the user to database', async () => {
    await postUser();
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it('should saves the username and email to database', async () => {
    await postUser();
    const userList = await User.findAll();
    const { username, email } = userList[0];
    expect(username).toBe('user1');
    expect(email).toBe('user1@mail.com');
  });

  it('should hashes the password in database', async () => {
    await postUser();
    const userList = await User.findAll();
    const { password } = userList[0];
    expect(password).not.toBe('PassWord!');
  });

  it('should returns 400 when username is null', async () => {
    const response = await postUser({
      username: null,
      email: 'user1@mail.com',
      password: 'PassWord!',
    });
    expect(response.status).toBe(400);
  });

  it('should returns validationErrors field in response body when validation error occurs', async () => {
    const response = await postUser({
      username: null,
      email: 'user1@mail.com',
      password: 'PassWord!',
    });
    const { body } = response;
    expect(body.validationErrors).not.toBeUndefined();
  });

  it('should returns Username cannot be null when username is null', async () => {
    const response = await postUser({
      username: null,
      email: 'user1@mail.com',
      password: 'PassWord!',
    });
    const { body } = response;
    expect(body.validationErrors.username).toBe('Username cannot be null');
  });
});
