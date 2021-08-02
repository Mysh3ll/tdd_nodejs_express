import bcrypt from 'bcrypt';
import User from '../model';

const save = async (body) => {
  const { password } = body;
  const hash = await bcrypt.hash(password, 10);
  const user = { ...body, password: hash };
  await User.create(user);
};

export default { save };
