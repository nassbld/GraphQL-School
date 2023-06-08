import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import userModel from '../models/user.model.js';

const validate = (email, password) => {
  if (!email || email === '') {
    throw new Error('email required');
  }
  if (!password || password === '') {
    throw new Error('password required');
  }
}

export default {
  loginUser: async (req, res, next) => {
    const { email, password } = req.body;
    validate(email, password)
    console.log(email, password)
    const user = await userModel.getUserByEmail({ email });

    if (!user) {
      res.status(401).json({ message: 'User not found' });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
        res.status(200).json({ user, token });
      } else {
        res.status(401).json({ message: 'Wrong password' });
      }
    }
  }
}