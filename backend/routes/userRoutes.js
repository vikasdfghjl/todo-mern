const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controller/userController');
const { protect } = require('../middleware/auth');


router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile); // Add this line


module.exports = router;