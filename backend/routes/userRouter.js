const express = require('express');

// controller functions
const {
  loginUser,
  signupUser,
  getMe,
} = require('../controllers/userControllers');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get user data route
// router.get('/me', protect, getMe);

module.exports = router;
