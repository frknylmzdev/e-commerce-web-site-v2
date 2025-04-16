const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('Bu e-posta adresi zaten kullanılıyor');
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Geçersiz kullanıcı bilgileri');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Geçersiz e-posta veya şifre');
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        phone: user.phone,
        addresses: user.addresses,
      });
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        phone: updatedUser.phone,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Add address to user profile
// @route   POST /api/users/address
// @access  Private
const addUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const newAddress = {
        addressType: req.body.addressType,
        addressName: req.body.addressName,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
        phone: req.body.phone,
        isDefault: req.body.isDefault || false,
      };

      // If new address is set as default, update all other addresses
      if (newAddress.isDefault) {
        user.addresses.forEach((address) => {
          address.isDefault = false;
        });
      }

      user.addresses.push(newAddress);
      await user.save();

      res.status(201).json(user.addresses);
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update user address
// @route   PUT /api/users/address/:id
// @access  Private
const updateUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const addressIndex = user.addresses.findIndex(
        (address) => address._id.toString() === req.params.id
      );

      if (addressIndex >= 0) {
        user.addresses[addressIndex] = {
          ...user.addresses[addressIndex],
          addressType: req.body.addressType || user.addresses[addressIndex].addressType,
          addressName: req.body.addressName || user.addresses[addressIndex].addressName,
          address: req.body.address || user.addresses[addressIndex].address,
          city: req.body.city || user.addresses[addressIndex].city,
          postalCode: req.body.postalCode || user.addresses[addressIndex].postalCode,
          country: req.body.country || user.addresses[addressIndex].country,
          phone: req.body.phone || user.addresses[addressIndex].phone,
          isDefault: req.body.isDefault !== undefined ? req.body.isDefault : user.addresses[addressIndex].isDefault,
        };

        // If updated address is set as default, update all other addresses
        if (user.addresses[addressIndex].isDefault) {
          user.addresses.forEach((address, index) => {
            if (index !== addressIndex) {
              address.isDefault = false;
            }
          });
        }

        await user.save();
        res.json(user.addresses);
      } else {
        res.status(404);
        throw new Error('Adres bulunamadı');
      }
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete user address
// @route   DELETE /api/users/address/:id
// @access  Private
const deleteUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const addressIndex = user.addresses.findIndex(
        (address) => address._id.toString() === req.params.id
      );

      if (addressIndex >= 0) {
        user.addresses.splice(addressIndex, 1);
        await user.save();
        res.json(user.addresses);
      } else {
        res.status(404);
        throw new Error('Adres bulunamadı');
      }
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      // Check if product already in wishlist
      if (user.wishlist.includes(productId)) {
        res.status(400);
        throw new Error('Ürün zaten favorilerde');
      }

      user.wishlist.push(productId);
      await user.save();
      res.status(201).json(user.wishlist);
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:id
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const user = await User.findById(req.user._id);

    if (user) {
      const index = user.wishlist.indexOf(productId);
      if (index > -1) {
        user.wishlist.splice(index, 1);
        await user.save();
        res.json(user.wishlist);
      } else {
        res.status(404);
        throw new Error('Ürün favorilerde bulunamadı');
      }
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');

    if (user) {
      res.json(user.wishlist);
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: 'Kullanıcı silindi' });
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('Kullanıcı bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
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
};
