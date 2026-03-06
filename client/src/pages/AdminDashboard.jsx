import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    stock: '',
    category: '',
    featured: false
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !isAdmin) return;
      
      try {
        const [ordersRes, productsRes, categoriesRes] = await Promise.all([
          axios.get('/api/orders/admin'),
          axios.get('/api/products'),
          axios.get('/api/categories')
        ]);
        
        setOrders(ordersRes.data.orders || []);
        setProducts(productsRes.data.products || []);
        setCategories(categoriesRes.data.categories || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isAuthenticated, isAdmin]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', newProduct);
      alert('Product added successfully!');
      setNewProduct({ name: '', description: '', price: '', originalPrice: '', stock: '', category: '', featured: false });
      const productsRes = await axios.get('/api/products');
      setProducts(productsRes.data.products || []);
    } catch (error) {
      alert('Error adding product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const name = prompt('Enter category name:');
    if (!name) return;
    
    try {
      await axios.post('/api/categories', { name, description: '' });
      const categoriesRes = await axios.get('/api/categories');
      setCategories(categoriesRes.data.categories || []);
      alert('Category added successfully!');
    } catch (error) {
      alert('Error adding category');
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="admin-auth-required">
        <div className="container">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalProducts = products.length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'processing').length;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your store</p>
        </div>

        <div className="admin-stats">
          <div className="admin-stat">
            <span className="stat-icon">$</span>
            <div className="stat-content">
              <span className="stat-value">${totalRevenue.toFixed(2)}</span>
              <span className="stat-label">Total Revenue</span>
            </div>
          </div>
          <div className="admin-stat">
            <span className="stat-icon">📦</span>
            <div className="stat-content">
              <span className="stat-value">{totalProducts}</span>
              <span className="stat-label">Products</span>
            </div>
          </div>
          <div className="admin-stat">
            <span className="stat-icon">📋</span>
            <div className="stat-content">
              <span className="stat-value">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
          </div>
          <div className="admin-stat">
            <span className="stat-icon">⏳</span>
            <div className="stat-content">
              <span className="stat-value">{pendingOrders}</span>
              <span className="stat-label">Pending Orders</span>
            </div>
          </div>
        </div>

        <div className="admin-tabs">
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            Orders
          </button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
            Products
          </button>
          <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>
            Categories
          </button>
        </div>

        {loading ? (
          <div className="loading-container"><div className="spinner"></div></div>
        ) : (
          <>
            {activeTab === 'orders' && (
              <div className="admin-section">
                <h2>All Orders</h2>
                <div className="admin-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order._id}>
                          <td>#{order._id.slice(-8)}</td>
                          <td>{order.user?.name || 'N/A'}</td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td>${order.totalAmount?.toFixed(2)}</td>
                          <td>
                            <select 
                              value={order.orderStatus}
                              onChange={async (e) => {
                                try {
                                  await axios.put(`/api/orders/${order._id}`, { orderStatus: e.target.value });
                                  setOrders(orders.map(o => o._id === order._id ? { ...o, orderStatus: e.target.value } : o));
                                } catch (error) {
                                  alert('Error updating status');
                                }
                              }}
                            >
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td>
                            <span className={`payment-status ${order.paymentStatus}`}>
                              {order.paymentStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="admin-section">
                <h2>Manage Products</h2>
                
                <form onSubmit={handleAddProduct} className="add-product-form">
                  <h3>Add New Product</h3>
                  <div className="form-grid">
                    <input type="text" placeholder="Product Name" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                    <input type="number" placeholder="Price" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                    <input type="number" placeholder="Original Price" value={newProduct.originalPrice} onChange={e => setNewProduct({...newProduct, originalPrice: e.target.value})} />
                    <input type="number" placeholder="Stock" required value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
                    <select required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                      <option value="">Select Category</option>
                      {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                    </select>
                    <label className="checkbox-label">
                      <input type="checkbox" checked={newProduct.featured} onChange={e => setNewProduct({...newProduct, featured: e.target.checked})} />
                      Featured
                    </label>
                  </div>
                  <textarea placeholder="Description" required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                  <button type="submit" className="btn btn-primary">Add Product</button>
                </form>

                <div className="admin-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>{product.category?.name}</td>
                          <td>${product.price}</td>
                          <td>{product.stock}</td>
                          <td>
                            <button className="btn-delete" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="admin-section">
                <h2>Manage Categories</h2>
                <button onClick={handleAddCategory} className="btn btn-primary mb-4">Add Category</button>
                <div className="categories-list">
                  {categories.map(category => (
                    <div key={category._id} className="category-item">
                      <span>{category.name}</span>
                      <span className="category-slug">{category.slug}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

