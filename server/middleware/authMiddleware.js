const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to protect routes that require authentication
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Yetkisiz erişim, token geçersiz');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Yetkisiz erişim, token bulunamadı');
  }
};

// Middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Yetkisiz erişim, admin yetkisi gerekli');
  }
};

module.exports = { protect, admin };
