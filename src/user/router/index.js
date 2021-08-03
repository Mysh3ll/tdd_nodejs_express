import express from 'express';
import UserService from '../service';

const router = express.Router();

router.post('/api/1.0/users', async (req, res) => {
  const user = req.body;
  if (user.username === null) {
    return res.status(400).send({
      validationErrors: {
        username: 'Username cannot be null',
      },
    });
  }
  await UserService.save(user);
  return res.send({ message: 'User created' });
});

export default router;
