import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('tdd-express', 'user', 'password', {
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});
