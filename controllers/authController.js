import { User } from '../model/userSchema.js';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const handleRegister = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: 'username, email and password are required' });
  }

  const duplicate = await User.findOne({ email });

  if (duplicate) {
    return res
      .status(409)
      .json({ message: 'user already exists, please login instead' });
  }
  const hashedPwd = await bcrypt.hash(password, 10);

  try {
    const createdUser = await User.create({
      username,
      email,
      password: hashedPwd,
    });
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({ message: 'new user created' });
};

const handleLogin = async (req, res) => {
  const jwt = jsonwebtoken;
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(401).json({ message: 'invalid email or password' });
  }

  const correctPwd = await bcrypt.compare(password, foundUser.password);

  if (!correctPwd) {
    return res.status(401).json({ message: 'invalid email or password' });
  }

  const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '2h',
  });

  res.json({ accessToken });
};

export { handleRegister, handleLogin };
