const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { forwardAuthenticated } = require('../config/auth.config');
const authController = require('../controllers/auth.controller');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');

// Load the HTML views
router.get('/login', forwardAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '../public/views/index.html')));
router.get('/register', forwardAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '../public/views/index.html')));
router.get('/forgot-password', forwardAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '../public/views/forgot.password.html')));

// Register
router.post('/register', authController.register);

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({ message: 'Login successful' });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// Password reset request
router.post('/forgot-password', authController.forgotPassword);
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'No user with that email' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetExpires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    const resetURL = `http://${req.headers.host}/reset-password/${resetToken}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetURL}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Password reset form submission
router.post('/reset-password/:token', async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
