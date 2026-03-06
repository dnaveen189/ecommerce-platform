import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopsmart');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopsmart.com',
      password: adminPassword,
      role: 'admin'
    });
    console.log('Created admin user');

    // Create test user
    const userPassword = await bcrypt.hash('user123', 10);
    const testUser = await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: userPassword,
      role: 'user'
    });
    console.log('Created test user');

    // Create categories
    const categories = [];
    const categoryData = [
      { name: 'Electronics', description: 'Latest gadgets and electronics' },
      { name: 'Fashion', description: 'Trendy clothing and accessories' },
      { name: 'Home & Living', description: 'Home decor and furniture' },
      { name: 'Sports', description: 'Sports equipment and gear' },
      { name: 'Books', description: 'Books and literature' }
    ];

    for (const cat of categoryData) {
      const category = await Category.create(cat);
      categories.push(category);
    }
    console.log('Created categories');

    // Create products
    const products = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling headphones with 30-hour battery life. Perfect for music lovers and professionals.',
        price: 149.99,
        originalPrice: 199.99,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
        category: categories[0]._id,
        stock: 50,
        rating: 4.5,
        numReviews: 128,
        featured: true,
        tags: ['electronics', 'audio', 'wireless']
      },
      {
        name: 'Smart Watch Pro',
        description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery. Water resistant to 50m.',
        price: 299.99,
        originalPrice: 349.99,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
        category: categories[0]._id,
        stock: 30,
        rating: 4.7,
        numReviews: 256,
        featured: true,
        tags: ['electronics', 'wearable', 'smartwatch']
      },
      {
        name: 'Laptop Stand Ergonomic',
        description: 'Adjustable aluminum laptop stand with heat dissipation. Ergonomic design for better posture.',
        price: 49.99,
        originalPrice: 69.99,
        images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'],
        category: categories[0]._id,
        stock: 100,
        rating: 4.3,
        numReviews: 89,
        featured: false,
        tags: ['electronics', 'accessories', 'office']
      },
      {
        name: 'Portable Bluetooth Speaker',
        description: 'Waterproof speaker with 360-degree sound. Perfect for outdoor adventures.',
        price: 79.99,
        originalPrice: 99.99,
        images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'],
        category: categories[0]._id,
        stock: 75,
        rating: 4.6,
        numReviews: 167,
        featured: true,
        tags: ['electronics', 'audio', 'speaker']
      },
      {
        name: 'Premium Cotton T-Shirt',
        description: '100% organic cotton t-shirt with comfortable fit. Available in multiple colors.',
        price: 29.99,
        originalPrice: 39.99,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
        category: categories[1]._id,
        stock: 200,
        rating: 4.4,
        numReviews: 312,
        featured: false,
        tags: ['fashion', 'clothing', 'essentials']
      },
      {
        name: 'Denim Jacket Classic',
        description: 'Timeless denim jacket with modern fit. Perfect for any casual occasion.',
        price: 89.99,
        originalPrice: 119.99,
        images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400'],
        category: categories[1]._id,
        stock: 45,
        rating: 4.6,
        numReviews: 98,
        featured: true,
        tags: ['fashion', 'jacket', 'denim']
      },
      {
        name: 'Running Shoes Pro',
        description: 'Lightweight running shoes with superior cushioning. Ideal for marathon runners.',
        price: 129.99,
        originalPrice: 159.99,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
        category: categories[3]._id,
        stock: 80,
        rating: 4.8,
        numReviews: 445,
        featured: true,
        tags: ['sports', 'shoes', 'running']
      },
      {
        name: 'Yoga Mat Premium',
        description: 'Extra thick yoga mat with non-slip surface. Eco-friendly materials.',
        price: 39.99,
        originalPrice: 49.99,
        images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400'],
        category: categories[3]._id,
        stock: 120,
        rating: 4.5,
        numReviews: 234,
        featured: false,
        tags: ['sports', 'yoga', 'fitness']
      },
      {
        name: 'Modern Table Lamp',
        description: 'Minimalist LED table lamp with adjustable brightness. Touch control.',
        price: 59.99,
        originalPrice: 79.99,
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400'],
        category: categories[2]._id,
        stock: 60,
        rating: 4.4,
        numReviews: 156,
        featured: false,
        tags: ['home', 'lighting', 'decor']
      },
      {
        name: 'Coffee Table Wood',
        description: 'Solid oak coffee table with minimalist design. Handcrafted quality.',
        price: 249.99,
        originalPrice: 299.99,
        images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400'],
        category: categories[2]._id,
        stock: 25,
        rating: 4.7,
        numReviews: 78,
        featured: true,
        tags: ['home', 'furniture', 'table']
      },
      {
        name: 'Bestseller Novel Collection',
        description: 'Collection of 5 bestselling novels. Perfect for book lovers.',
        price: 49.99,
        originalPrice: 64.99,
        images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'],
        category: categories[4]._id,
        stock: 150,
        rating: 4.6,
        numReviews: 289,
        featured: false,
        tags: ['books', 'fiction', 'bestseller']
      },
      {
        name: 'Programming Guide Book',
        description: 'Comprehensive guide to modern web development. From basics to advanced.',
        price: 39.99,
        originalPrice: 49.99,
        images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400'],
        category: categories[4]._id,
        stock: 90,
        rating: 4.8,
        numReviews: 167,
        featured: true,
        tags: ['books', 'programming', 'tech']
      }
    ];

    await Product.insertMany(products);
    console.log('Created products');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📧 Admin Account:');
    console.log('   Email: admin@shopsmart.com');
    console.log('   Password: admin123');
    console.log('\n📧 Test User Account:');
    console.log('   Email: user@test.com');
    console.log('   Password: user123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

