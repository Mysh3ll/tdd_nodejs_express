import express from 'express';
import User from './user/model/user';
import bcrypt from 'bcrypt';

const app = express();

app.use(express.json());

app.post('/api/1.0/users', (req, res) => {
  const { password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const user = { ...req.body, password: hash };
    User.create(user).then(() => {
      return res.send({ message: 'User created' });
    });
  });
});

export default app;
