const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');

// Load User model
const User = require('../../models/User');

// @route GET api/users/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'users works' }));

// @route POST api/users/register
// @description Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Chek Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg', // Rating
        d: 'mm' // default
      });

      const newUser = new User({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
      // password hashing & saving new user
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.log(err);
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @description Login User | Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: 'Success' });
      } else {
        return res.status(400).json({ password: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;
