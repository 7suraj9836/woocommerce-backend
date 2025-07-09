const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.registerUser = async ({ name, email, password }) => {
  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.createUser(name, email, hashedPassword);

  return user;
};

exports.loginUser = async ({ email, password }) => {
  const user = await userModel.findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token, user };
};
