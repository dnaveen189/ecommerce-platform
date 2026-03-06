import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { isConnected } from '../config/db.js';

// Demo products for when MongoDB is not available
const demoProducts = [
  {
    _id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.',
    price: 199.99,
    originalPrice: 249.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
    category: { _id: '1', name: 'Electronics', slug: 'electronics' },
    stock: 50,
    rating: 4.5,
    numReviews: 128,
    tags: ['wireless', 'headphones', 'audio'],
    featured: true
  },
  {
    _id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life. Water resistant to 50 meters.',
    price: 349.99,
    originalPrice: 399.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
    category: { _id: '1', name: 'Electronics', slug: 'electronics' },
    stock: 30,
    rating: 4.8,
    numReviews: 256,
    tags: ['smartwatch', 'fitness', 'wearable'],
    featured: true
  },
  {
    _id: '3',
    name: 'Minimalist Leather Backpack',
    description: 'Stylish leather backpack with laptop compartment, USB charging port, and water-resistant material.',
    price: 129.99,
    originalPrice: 159.99,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
    category: { _id: '2', name: 'Fashion', slug: 'fashion' },
    stock: 45,
    rating: 4.3,
    numReviews: 89,
    tags: ['backpack', 'leather', 'fashion'],
    featured: true
  },
  {
    _id: '4',
    name: 'Running Shoes Ultra',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 89.99,
    originalPrice: 119.99,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
    category: { _id: '3', name: 'Sports', slug: 'sports' },
    stock: 100,
    rating: 4.6,
    numReviews: 342,
    tags: ['shoes', 'running', 'sports'],
    featured: false
  },
  {
    _id: '5',
    name: 'Organic Coffee Beans',
    description: 'Premium organic coffee beans, medium roast, rich flavor with notes of chocolate and caramel.',
    price: 24.99,
    originalPrice: 29.99,
    images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'],
    category: { _id: '4', name: 'Food & Beverage', slug: 'food' },
    stock: 200,
    rating: 4.7,
    numReviews: 567,
    tags: ['coffee', 'organic', 'beverage'],
    featured: false
  },
  {
    _id: '6',
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with premium audio, multi-room support, and smart home integration.',
    price: 149.99,
    originalPrice: 179.99,
    images: ['https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400'],
    category: { _id: '1', name: 'Electronics', slug: 'electronics' },
    stock: 60,
    rating: 4.4,
    numReviews: 198,
    tags: ['speaker', 'smart home', 'audio'],
    featured: true
  },
  {
    _id: '7',
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with non-slip surface, eco-friendly materials, and carrying strap.',
    price: 49.99,
    originalPrice: 69.99,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400'],
    category: { _id: '3', name: 'Sports', slug: 'sports' },
    stock: 150,
    rating: 4.2,
    numReviews: 234,
    tags: ['yoga', 'fitness', 'exercise'],
    featured: false
  },
  {
    _id: '8',
    name: 'Designer Sunglasses',
    description: 'UV400 protection sunglasses with polarized lenses and lightweight titanium frame.',
    price: 159.99,
    originalPrice: 199.99,
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'],
    category: { _id: '2', name: 'Fashion', slug: 'fashion' },
    stock: 75,
    rating: 4.5,
    numReviews: 156,
    tags: ['sunglasses', 'fashion', 'accessories'],
    featured: true
  }
];

const demoCategories = [
  { _id: '1', name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and electronics' },
  { _id: '2', name: 'Fashion', slug: 'fashion', description: 'Trendy fashion items' },
  { _id: '3', name: 'Sports', slug: 'sports', description: 'Sports and fitness equipment' },
  { _id: '4', name: 'Food & Beverage', slug: 'food', description: 'Organic and premium food items' }
];

// @desc    Get all products with search, filters, pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    // Return demo data if MongoDB not connected
    if (!isConnected) {
      let products = [...demoProducts];
      
      // Apply search filter
      if (req.query.search) {
        const search = req.query.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(search) || 
          p.description.toLowerCase().includes(search) ||
          p.tags.some(t => t.toLowerCase().includes(search))
        );
      }
      
      // Apply category filter
      if (req.query.category) {
        products = products.filter(p => p.category.slug === req.query.category);
      }
      
      // Apply price filter
      if (req.query.minPrice) {
        products = products.filter(p => p.price >= parseFloat(req.query.minPrice));
      }
      if (req.query.maxPrice) {
        products = products.filter(p => p.price <= parseFloat(req.query.maxPrice));
      }
      
      // Apply sorting
      if (req.query.sort) {
        switch (req.query.sort) {
          case 'price_asc':
            products.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            products.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            products.sort((a, b) => b.rating - a.rating);
            break;
          case 'name':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
      }
      
      // Pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedProducts = products.slice(startIndex, endIndex);
      
      return res.json({
        success: true,
        products: paginatedProducts,
        page,
        pages: Math.ceil(products.length / limit),
        total: products.length
      });
    }
    
    // Original MongoDB code for when connected
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    let query = { stock: { $gt: 0 } };

    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    if (req.query.rating) {
      query.rating = { $gte: parseFloat(req.query.rating) };
    }

    if (req.query.featured === 'true') {
      query.featured = true;
    }

    let sort = { createdAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price_asc': sort = { price: 1 }; break;
        case 'price_desc': sort = { price: -1 }; break;
        case 'rating': sort = { rating: -1 }; break;
        case 'name': sort = { name: 1 }; break;
        default: sort = { createdAt: -1 };
      }
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      products,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    if (!isConnected) {
      const product = demoProducts.find(p => p._id === req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.json({ success: true, product });
    }
    
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('reviews.user', 'name avatar');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    if (!isConnected) {
      return res.status(503).json({ success: false, message: 'Database not connected' });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    if (!isConnected) {
      return res.status(503).json({ success: false, message: 'Database not connected' });
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured/list
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    if (!isConnected) {
      const featured = demoProducts.filter(p => p.featured);
      return res.json({ success: true, products: featured });
    }
    
    const products = await Product.find({ featured: true, stock: { $gt: 0 } })
      .populate('category', 'name slug')
      .limit(8);

    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:slug
// @access  Public
export const getProductsByCategory = async (req, res) => {
  try {
    if (!isConnected) {
      const category = demoCategories.find(c => c.slug === req.params.slug);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      const products = demoProducts.filter(p => p.category.slug === req.params.slug);
      return res.json({ success: true, products, category });
    }
    
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const products = await Product.find({ category: category._id, stock: { $gt: 0 } })
      .populate('category', 'name slug');

    res.json({ success: true, products, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add review to product
// @route   POST /api/products/:id/reviews
// @access  Private
export const addReview = async (req, res) => {
  try {
    if (!isConnected) {
      return res.status(503).json({ success: false, message: 'Database not connected' });
    }
    
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: 'Product already reviewed' });
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    await product.save();
    product.calcAverageRating();

    res.status(201).json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

