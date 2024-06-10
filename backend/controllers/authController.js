// C:\Users\locon\Desktop\COde\restaurante\backend\controllers\authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

exports.register = [
  // Validar y sanitizar campos
  body('username').trim().isLength({ min: 1 }).escape().withMessage('Username is required'),
  body('password').trim().isLength({ min: 6 }).escape().withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

    try {
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const newUser = new User({ username, password, role });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      const payload = { user: { id: newUser.id, role: newUser.role } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
];

exports.login = [
  // Validar y sanitizar campos
  body('username').trim().isLength({ min: 1 }).escape().withMessage('Username is required'),
  body('password').trim().isLength({ min: 1 }).escape().withMessage('Password is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = { user: { id: user.id, role: user.role } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
];
