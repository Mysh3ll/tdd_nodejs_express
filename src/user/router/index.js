import express from 'express';
import UserService from '../service';

const router = express.Router();

router.post('/api/1.0/users', async (req, res) => {
  await UserService.save(req.body);
  return res.send({ message: 'User created' });
});

export default router;
