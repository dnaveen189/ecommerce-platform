# ShopSmart - E-Commerce Platform

A modern, full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features include AI-powered product recommendations, JWT-based authentication, shopping cart management, checkout process, and a comprehensive admin dashboard for inventory management.

**Live Demo**: Access the platform at `http://localhost:3001/` after running the development server.

## ✨ Key Features

- **User Authentication**: Secure JWT-based login and registration system
- **Product Listings**: Browse, search, filter, and sort products with ratings
- **Shopping Cart**: Add/remove items with persistent storage and quantity management
- **Checkout System**: Complete order placement with shipping and payment information
- **User Dashboard**: View order history and track order status
- **Admin Dashboard**: Full inventory management - add, edit, delete products and categories
- **Order Management**: Admin can view and manage all user orders
- **Responsive Design**: Mobile-friendly interface with modern dark theme
- **Sample Data**: Pre-loaded with 12+ products across 5 categories

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18, Vite, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas Cloud or Local) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Styling** | Custom CSS with responsive design |

## 📋 Prerequisites

- **Node.js** v14 or higher
- **npm** or **yarn** package manager
- **MongoDB** (Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/dnaveen189/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Install Dependencies
```bash
npm run install:all
```
This installs dependencies for both the root, server, and client directories.

### 3. Configure Environment Variables

Create a `server/.env` file with the following content:

**Option A: Using MongoDB Atlas (Cloud - Recommended)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shopsmart?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Option B: Using Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/shopsmart
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

> **Note**: Replace `username`, `password`, and `cluster0.xxxxx` with your actual MongoDB credentials if using Atlas.

### 4. Seed the Database with Sample Data

```bash
cd server
node utils/seed.js
cd ..
```

This creates:
- Admin account: `admin@shopsmart.com` / `admin123`
- Test user: `user@test.com` / `user123`
- 5 product categories
- 12 sample products with images and ratings

### 5. Start the Development Server

```bash
npm run dev
```

The application will launch on:
- **Frontend**: http://localhost:3001/ (React App)
- **Backend**: http://localhost:5000/ (API Server)

## 📁 Project Structure

```
ecommerce-platform/
├── client/                      # React frontend (Vite)
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx       # Top navigation bar
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   └── ProductCard.jsx  # Product display card
│   │   ├── context/             # React Context API
│   │   │   ├── AuthContext.jsx  # Authentication state
│   │   │   └── CartContext.jsx  # Shopping cart state
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Products.jsx     # Product listing page
│   │   │   ├── ProductDetail.jsx # Individual product details
│   │   │   ├── Cart.jsx         # Shopping cart page
│   │   │   ├── Checkout.jsx     # Order checkout page
│   │   │   ├── Dashboard.jsx    # User dashboard
│   │   │   ├── AdminDashboard.jsx # Admin panel
│   │   │   ├── Login.jsx        # Login page
│   │   │   └── Register.jsx     # Registration page
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # React entry point
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   └── package.json
│
├── server/                      # Express.js backend
│   ├── config/
│   │   └── db.js                # MongoDB connection setup
│   ├── controllers/             # Route handler logic
│   │   ├── authController.js    # Auth operations
│   │   ├── productController.js # Product operations
│   │   ├── categoryController.js# Category operations
│   │   └── orderController.js   # Order operations
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js              # User model
│   │   ├── Product.js           # Product model
│   │   ├── Category.js          # Category model
│   │   └── Order.js             # Order model
│   ├── routes/                  # API route definitions
│   │   ├── authRoutes.js        # Authentication endpoints
│   │   ├── productRoutes.js     # Product endpoints
│   │   ├── categoryRoutes.js    # Category endpoints
│   │   └── orderRoutes.js       # Order endpoints
│   ├── utils/
│   │   └── seed.js              # Database seeding script
│   ├── server.js                # Express app entry point
│   ├── package.json
│   └── .env                     # Environment variables (not in Git)
│
├── package.json                 # Root package.json with scripts
├── README.md                    # This file
└── .gitignore                   # Git ignore rules
```

## 🔌 Complete API Reference

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user with credentials | No |
| GET | `/api/auth/me` | Get current authenticated user | Yes |

### Product Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products with filters | No |
| GET | `/api/products/:id` | Get single product details | No |
| POST | `/api/products` | Create new product | **Admin** |
| PUT | `/api/products/:id` | Update product details | **Admin** |
| DELETE | `/api/products/:id` | Delete product | **Admin** |

### Category Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/categories` | Get all product categories | No |
| POST | `/api/categories` | Create new category | **Admin** |

### Order Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/orders` | Get user's orders | Yes |
| POST | `/api/orders` | Create/place new order | Yes |
| GET | `/api/orders/admin` | Get all orders (admin view) | **Admin** |
| PUT | `/api/orders/:id` | Update order status | **Admin** |

## 👥 Default Test Accounts

### Admin Account
```
Email: admin@shopsmart.com
Password: admin123
```
Full access to admin dashboard for managing products, categories, and orders.

### Test User Account
```
Email: user@test.com
Password: user123
```
Regular user account for testing checkout and order placement.

## 🎮 How to Use

### For Regular Users
1. **Register/Login**: Create account or use test credentials
2. **Browse Products**: Explore products by category or search
3. **View Details**: Click products to see detailed information and reviews
4. **Add to Cart**: Select quantity and add items to shopping cart
5. **Checkout**: Fill in shipping details and place order
6. **Track Orders**: View order history in user dashboard

### For Admins
1. **Login**: Use admin credentials (admin@shopsmart.com / admin123)
2. **Access Admin Panel**: Navigate to admin dashboard
3. **Manage Products**: Add, edit, or delete products
4. **Manage Categories**: Create and organize product categories
5. **View Orders**: Monitor all customer orders and update status

## 🐛 Troubleshooting

### MongoDB Connection Issues
- **Error**: `ECONNREFUSED 127.0.0.1:27017`
- **Solution**: 
  - If using local MongoDB: Start MongoDB service
  - If using Atlas: Check `MONGODB_URI` in `.env` file
  - Verify internet connection and whitelisted IP in Atlas

### Port Already in Use
- **Error**: `Port 3000/5000 is already in use`
- **Solution**: 
  - Change PORT in `.env` file
  - Or kill the process: `lsof -ti:5000 | xargs kill -9` (macOS/Linux) or `netstat -ano | findstr :5000` (Windows)

### Dependencies Not Installing
- **Error**: `npm ERR! code ERESOLVE`
- **Solution**: 
  ```bash
  npm install --legacy-peer-deps
  ```

## 📦 Available Scripts

```bash
# Root level
npm run install:all      # Install all dependencies
npm run dev              # Start both servers concurrently
npm run server           # Start only backend
npm run client           # Start only frontend
npm run build            # Build frontend for production

# Server specific
cd server && npm run dev # Start backend with file watching

# Client specific
cd client && npm run dev # Start Vite dev server
cd client && npm run build # Build React app for production
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway/Render)
```bash
git push heroku main
# Or follow your deployment platform's guidelines
```

### Environment Variables for Production
- `MONGODB_URI`: Production MongoDB connection string
- `JWT_SECRET`: Strong secret key (generate a random string)
- `NODE_ENV`: Set to `production`
- `CORS_ORIGIN`: Your frontend domain

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 💡 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] User profile management
- [ ] Two-factor authentication
- [ ] Analytics dashboard
- [ ] Caching with Redis
- [ ] Docker containerization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📞 Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/dnaveen189/ecommerce-platform/issues).

---

**Made with ❤️ by ShopSmart Team**

