const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;


// const User = require('../models/User');
// 
// router.put('/make-admin/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.role = 'admin';
//     await user.save();
//     res.json({ message: `${user.email} is now an admin.` });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
