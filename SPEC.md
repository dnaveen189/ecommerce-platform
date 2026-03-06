# E-Commerce Platform Specification

## 1. Project Overview

**Project Name:** ShopSmart - E-Commerce Platform  
**Project Type:** Full-stack Web Application  
**Core Functionality:** A modern e-commerce platform with user authentication, product management, shopping cart, payment processing, admin dashboard, and AI-powered product recommendations.  
**Target Users:** Online shoppers, Store administrators

---

## 2. Tech Stack

- **Frontend:** React.js 18 with Vite
- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Payment:** Stripe Integration
- **AI Recommendations:** TensorFlow.js for client-side recommendations
- **Styling:** Custom CSS with CSS Variables

---

## 3. UI/UX Specification

### Color Palette
- **Primary:** `#0D1117` (Deep dark background)
- **Secondary:** `#161B22` (Card backgrounds)
- **Accent:** `#FF6B35` (Vibrant orange - CTAs, highlights)
- **Accent Secondary:** `#00D9FF` (Cyan - interactive elements)
- **Text Primary:** `#F0F6FC` (White text)
- **Text Secondary:** `#8B949E` (Muted text)
- **Success:** `#238636` (Green)
- **Error:** `#F85149` (Red)
- **Border:** `#30363D`

### Typography
- **Font Family:** 
  - Headings: 'Clash Display', sans-serif (Google Fonts)
  - Body: 'Satoshi', sans-serif
- **Font Sizes:**
  - H1: 3rem (48px)
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Layout Structure
- **Max Width:** 1400px
- **Grid:** CSS Grid with 12-column system
- **Spacing Scale:** 4px base (4, 8, 12, 16, 24, 32, 48, 64px)
- **Border Radius:** 8px (cards), 4px (buttons), 50% (avatars)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Effects
- Box shadows: `0 4px 24px rgba(0, 0, 0, 0.4)`
- Hover transitions: 0.3s ease
- Gradient accents: linear-gradient(135deg, #FF6B35, #FF8F65)
- Glassmorphism on modals: backdrop-filter: blur(10px)

---

## 4. Page Structure

### 4.1 Navbar (All Pages)
- Logo (left)
- Navigation links: Home, Products, Categories
- Search bar (center)
- User actions: Cart icon with count, User dropdown (right)
- Sticky on scroll

### 4.2 Home Page
- Hero section with animated background
- Featured products carousel
- Category showcase
- AI Recommendations section
- Newsletter signup

### 4.3 Products Page
- Sidebar with filters (category, price range, rating)
- Product grid (3-4 columns)
- Search bar at top
- Sort options (price, name, rating)
- Pagination

### 4.4 Product Detail Page
- Product images gallery
- Product info (name, price, description)
- Size/Color variants
- Quantity selector
- Add to Cart button
- Related products
- AI "You might also like" section

### 4.5 Shopping Cart
- Cart items list with images
- Quantity controls
- Remove item button
- Order summary
- Promo code input
- Checkout button

### 4.6 Checkout Page
- Shipping information form
- Payment integration (Stripe Elements)
- Order review
- Place Order button

### 4.7 User Dashboard
- Profile information
- Order history
- Saved addresses

### 4.8 Admin Dashboard
- Statistics cards (orders, revenue, products)
- Recent orders table
- Inventory management table
- Add/Edit product modal
- Analytics charts

---

## 5. API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:id` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove cart item

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/admin` - Get all orders (admin)

### Recommendations
- `GET /api/recommendations` - Get AI recommendations

---

## 6. Database Schema

### User
```
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'user', 'admin'),
  avatar: String,
  addresses: [{
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  }],
  createdAt: Date
}
```

### Product
```
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  images: [String],
  category: ObjectId (ref: Category),
  stock: Number,
  rating: Number,
  reviews: [{
    user: ObjectId,
    rating: Number,
    comment: String,
    date: Date
  }],
  tags: [String],
  featured: Boolean,
  createdAt: Date
}
```

### Category
```
{
  name: String,
  slug: String (unique),
  image: String,
  description: String
}
```

### Order
```
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  totalAmount: Number,
  createdAt: Date
}
```

---

## 7. AI Product Recommendations

### Implementation
- Use TensorFlow.js for client-side ML
- Track user browsing history (localStorage)
- Collaborative filtering based on:
  - User's purchase history
  - Similar products viewed
  - Popular items in category
- Display "Recommended for You" section on home and product pages

### Recommendation Logic
1. Content-based: Recommend similar products based on category/tags
2. Popularity-based: Show trending products
3. Personalized: Based on user's cart contents

---

## 8. Acceptance Criteria

### Authentication
- [ ] Users can register with email and password
- [ ] Users can login and receive JWT token
- [ ] Protected routes require valid token
- [ ] Admin users can access dashboard

### Products
- [ ] Products display in grid with images
- [ ] Search works by product name
- [ ] Filters work (category, price range)
- [ ] Sorting works (price, name, rating)
- [ ] Product detail shows all information

### Shopping Cart
- [ ] Add products to cart
- [ ] Update quantity
- [ ] Remove items
- [ ] Cart persists (localStorage)

### Checkout
- [ ] Fill shipping information
- [ ] Stripe payment integration works
- [ ] Order created on successful payment

### Admin Dashboard
- [ ] View all orders
- [ ] Manage inventory (CRUD products)
- [ ] View statistics

### AI Recommendations
- [ ] Recommendations show on homepage
- [ ] Recommendations update based on browsing

---

## 9. Project Structure

```
ecommerce-platform/
├── server/                    # Backend
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/          # Route controllers
│   ├── middleware/
│   │   └── auth.js          # JWT middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   ├── server.js             # Entry point
│   └── package.json
├── client/                    # Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React context
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── package.json              # Root package.json
```

