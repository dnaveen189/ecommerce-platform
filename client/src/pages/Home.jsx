
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('/api/products/featured/list'),
          axios.get('/api/categories')
        ]);
        
        setFeaturedProducts(productsRes.data.products || []);
        setCategories(categoriesRes.data.categories || []);
        
        // Get AI recommendations
        const recsRes = await axios.get('/api/products');
        setRecommendations(recsRes.data.products?.slice(0, 4) || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fadeIn">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              AI-Powered Shopping Experience
            </div>
            
            <h1 className="hero-title">
              Discover Your <span>Perfect</span> Products
            </h1>
            
            <p className="hero-desc">
              Shop smarter with our AI-powered recommendations. Find exactly what you need 
              from our curated collection of premium products.
            </p>
            
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/products?featured=true" className="btn btn-secondary btn-lg">
                Featured Products
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="hero-stat">
                <h3>10K+</h3>
                <p>Products</p>
              </div>
              <div className="hero-stat">
                <h3>5K+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="hero-stat">
                <h3>4.9</h3>
                <p>Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Browse our wide range of categories</p>
          </div>
          
          <div className="categories-grid">
            {categories.length > 0 ? (
              categories.slice(0, 4).map((category, index) => (
                <Link 
                  to={`/category/${category.slug}`} 
                  key={category._id}
                  className="category-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {category.image ? (
                    <img src={category.image} alt={category.name} />
                  ) : (
                    <div className="category-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  )}
                  <div className="category-overlay">
                    <span className="category-name">{category.name}</span>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <Link to="/category/electronics" className="category-card">
                  <div className="category-placeholder" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
                  <div className="category-overlay">
                    <span className="category-name">Electronics</span>
                  </div>
                </Link>
                <Link to="/category/fashion" className="category-card">
                  <div className="category-placeholder" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}></div>
                  <div className="category-overlay">
                    <span className="category-name">Fashion</span>
                  </div>
                </Link>
                <Link to="/category/home" className="category-card">
                  <div className="category-placeholder" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}></div>
                  <div className="category-overlay">
                    <span className="category-name">Home & Living</span>
                  </div>
                </Link>
                <Link to="/category/sports" className="category-card">
                  <div className="category-placeholder" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}></div>
                  <div className="category-overlay">
                    <span className="category-name">Sports</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked products just for you</p>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product, index) => (
                  <div key={product._id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="product-card-skeleton">
                      <div className="skeleton-image"></div>
                      <div className="skeleton-content">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line short"></div>
                        <div className="skeleton-line"></div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
          
          <div className="section-cta">
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="recommendations-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ai-icon">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
                <circle cx="8" cy="14" r="2"></circle>
                <circle cx="16" cy="14" r="2"></circle>
              </svg>
              Recommended For You
            </h2>
            <p className="section-subtitle">AI-powered suggestions based on your preferences</p>
          </div>
          
          <div className="products-grid">
            {recommendations.length > 0 ? (
              recommendations.map((product, index) => (
                <div key={product._id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="recommendations-empty">
                <p>Browse products to get personalized recommendations!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for exclusive deals and updates</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


