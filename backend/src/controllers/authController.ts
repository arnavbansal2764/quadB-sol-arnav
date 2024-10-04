// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Register a new user
export const register = async(req:any,res:any) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return res.status(201).json({ token });
  } catch (err:any) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// Sign in a user
export const signin = async (req:any,res:any) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (err:any) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};
