const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const nodemailer = require('nodemailer'); 

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.user_id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h' // Adjust token expiration as needed
  });
};

// User registration using Passport strategy with bcrypt password hashing
exports.register = async (req, res, next) => {
  passport.authenticate('register', { session: false }, async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({ error: info.message });
      }
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })(req, res, next);
};

// User login using Passport strategy
exports.login = async (req, res, next) => {
  passport.authenticate('login', { session: false }, async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const token = generateToken(user);
        return res.json({ token });
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })(req, res, next);
};

// Passport 'register' strategy with bcrypt password hashing
passport.use('register', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, username, password, done) => {
    try {
      const { email, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password before storing
      const user = await User.create({ username, password: hashedPassword, email, role });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      to: user.email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the following link to reset your password: ${baseURL}reset-password?token=${token}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Passport 'login' strategy (already included in previous example)
// No password hashing needed here since we're comparing passwords

// Function to generate JWT token (already included in previous example)
