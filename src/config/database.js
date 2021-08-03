import { Sequelize } from 'sequelize';
import config from 'config';

const { database, username, password, dialect, storage, logging } = config.get('database');

export const sequelize = new Sequelize(database, username, password, {
  dialect,
  storage,
  logging,
});
