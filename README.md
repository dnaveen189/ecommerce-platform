# ShopSmart - E-Commerce Platform

A modern e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring AI-powered product recommendations, user authentication, shopping cart, checkout, and an admin dashboard.

## Features

- **User Authentication**: JWT-based authentication with login/register
- **Product Listings**: Search, filter, and sort products
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout**: Order placement with shipping info
- **User Dashboard**: View orders and order history
- **Admin Dashboard**: Manage products, categories, and orders
- **AI Recommendations**: Personalized product suggestions

## Tech Stack

- **Frontend**: React 18, Vite, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS with dark theme

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
cd ecommerce-platform
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Set up environment variables:

Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/shopsmart
JWT_SECRET=your_secret_key_here
PORT=5000
```

4. Seed the database (optional):
```bash
cd server
node utils/seed.js
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
ecommerce-platform/
├── server/                 # Express backend
│   ├── config/            # Database config
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth middleware
│   ├── models/           # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Seed data
│   └── server.js        # Entry point
├── client/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React contexts
│   │   ├── pages/       # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── package.json
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/admin` - Get all orders (admin)

## Default Admin Account

After seeding, you can login as admin:
- Email: admin@shopsmart.com
- Password: admin123

## License

MIT

