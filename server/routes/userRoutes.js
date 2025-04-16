const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/userController');

// Public routes
router.route('/').post(registerUser);
router.route('/login').post(authUser);

// Protected routes
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/address').post(protect, addUserAddress);
router
  .route('/address/:id')
  .put(protect, updateUserAddress)
  .delete(protect, deleteUserAddress);

router
  .route('/wishlist')
  .get(protect, getWishlist)
  .post(protect, addToWishlist);
router.route('/wishlist/:id').delete(protect, removeFromWishlist);

// Admin routes
router.route('/').get(protect, admin, getUsers);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

module.exports = router;
