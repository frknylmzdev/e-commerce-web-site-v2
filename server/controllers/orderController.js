const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('Sipariş öğesi bulunamadı');
    }

    // Create new order
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Update product stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock -= item.quantity;
        await product.save();
      }
    }

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      // Check if the order belongs to the user or if the user is an admin
      if (
        order.user._id.toString() === req.user._id.toString() ||
        req.user.isAdmin
      ) {
        res.json(order);
      } else {
        res.status(401);
        throw new Error('Bu siparişi görüntüleme yetkiniz yok');
      }
    } else {
      res.status(404);
      throw new Error('Sipariş bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Sipariş bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = 'delivered';

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Sipariş bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status || order.status;
      
      if (trackingNumber) {
        order.trackingNumber = trackingNumber;
      }
      
      if (status === 'delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Sipariş bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const count = await Order.countDocuments({});
    const orders = await Order.find({})
      .populate('user', 'id name')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
    
    res.json({
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      totalOrders: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Check if the order belongs to the user or if the user is an admin
      if (
        order.user.toString() === req.user._id.toString() ||
        req.user.isAdmin
      ) {
        // Check if order can be cancelled
        if (order.status === 'delivered' || order.status === 'shipped') {
          res.status(400);
          throw new Error('Teslim edilen veya kargoya verilen siparişler iptal edilemez');
        }

        order.status = 'cancelled';

        // Restore product stock
        for (const item of order.orderItems) {
          const product = await Product.findById(item.product);
          if (product) {
            product.countInStock += item.quantity;
            await product.save();
          }
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(401);
        throw new Error('Bu siparişi iptal etme yetkiniz yok');
      }
    } else {
      res.status(404);
      throw new Error('Sipariş bulunamadı');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add note to order
// @route   PUT /api/orders/:id/note
// @access  Private/Admin
const addOrderNote = async (req, res) => {
  try {
    const { note } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.notes = note;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Sipariş bulunamadı');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  cancelOrder,
  addOrderNote,
};
