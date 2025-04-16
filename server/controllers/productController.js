const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    
    const category = req.query.category && req.query.category !== 'all'
      ? { category: req.query.category }
      : {};
    
    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(req.query.sortBy ? getSortOption(req.query.sortBy) : { createdAt: -1 });
    
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to get sort option
const getSortOption = (sortBy) => {
  switch (sortBy) {
    case 'price-low':
      return { price: 1 };
    case 'price-high':
      return { price: -1 };
    case 'rating':
      return { rating: -1 };
    case 'newest':
      return { createdAt: -1 };
    default:
      return { createdAt: -1 };
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Ürün bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      image,
      category,
      countInStock,
      specifications,
      oldPrice,
      featured,
    } = req.body;
    
    const product = new Product({
      name,
      price,
      description,
      image,
      category,
      countInStock,
      specifications: specifications || [],
      oldPrice: oldPrice || null,
      featured: featured || false,
      user: req.user._id,
    });
    
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      image,
      category,
      countInStock,
      specifications,
      oldPrice,
      featured,
      isNew,
      onSale,
    } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      product.name = name || product.name;
      product.price = price !== undefined ? price : product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.category = category || product.category;
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
      product.specifications = specifications || product.specifications;
      product.oldPrice = oldPrice !== undefined ? oldPrice : product.oldPrice;
      product.featured = featured !== undefined ? featured : product.featured;
      product.isNew = isNew !== undefined ? isNew : product.isNew;
      product.onSale = onSale !== undefined ? onSale : product.onSale;
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Ürün bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      await product.remove();
      res.json({ message: 'Ürün silindi' });
    } else {
      res.status(404);
      throw new Error('Ürün bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      // Check if user already reviewed
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Bu ürün için zaten bir değerlendirme yapmışsınız');
      }
      
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      
      product.reviews.push(review);
      
      product.reviewCount = product.reviews.length;
      
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      
      await product.save();
      res.status(201).json({ message: 'Değerlendirme eklendi' });
    } else {
      res.status(404);
      throw new Error('Ürün bulunamadı');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get new products
// @route   GET /api/products/new
// @access  Public
const getNewProducts = async (req, res) => {
  try {
    const products = await Product.find({ isNew: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products on sale
// @route   GET /api/products/sale
// @access  Public
const getProductsOnSale = async (req, res) => {
  try {
    const products = await Product.find({ onSale: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getFeaturedProducts,
  getNewProducts,
  getProductsOnSale,
  getProductsByCategory,
};
