import { User } from '../model/userSchema.js';

const handleRegister = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: 'username, email and password are required' });
  }

  const duplicate = await User.find({ email });

  if (duplicate) {
    return res
      .status(409)
      .json({ message: 'user already exists, please login instead' });
  }

  try {
    const createdUser = await User.create({
      username,
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({ message: 'new user created' });
};

export { handleRegister };
