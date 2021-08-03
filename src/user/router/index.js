import express from 'express';
import UserService from '../service';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/1.0/users',
  check('username').notEmpty().withMessage('Username cannot be null'),
  check('email').notEmpty().withMessage('Email cannot be null'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors.array().forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }
    await UserService.save(req.body);
    return res.send({ message: 'User created' });
  }
);

export default router;
