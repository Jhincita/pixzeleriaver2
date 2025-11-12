import { useState, useEffect } from 'react';
import '../../styles/AdminPanel.css';

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    sales: 0
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const defaultProducts = [
      { id: 1, name: 'Pixza Pepperoni', price: 9000, stock: 42, category: 'clásica', sales: 152 },
      { id: 2, name: 'Pixza Margherita', price: 8000, stock: 30, category: 'clásica', sales: 128 },
      { id: 3, name: 'Pixza Prosciutto', price: 10000, stock: 18, category: 'especial', sales: 98 },
      { id: 4, name: 'Pixza Datterini', price: 9000, stock: 99, category: 'gourmet', sales: 240 },
      { id: 5, name: 'Pixza Buffalina', price: 10000, stock: 25, category: 'gourmet', sales: 60 },
    ];
    setProducts(defaultProducts);
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    } else if (formData.name.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!formData.price || formData.price <= 0) {
      errors.price = 'El precio debe ser mayor a 0';
    }
    
    if (formData.stock === '' || formData.stock < 0) {
      errors.stock = 'El stock no puede ser negativo';
    }
    
    if (!formData.category) {
      errors.category = 'Selecciona una categoría';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenForm = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
        sales: product.sales
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        stock: '',
        category: '',
        sales: 0
      });
    }
    setFormErrors({});
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '', category: '', sales: 0 });
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      sales: Number(formData.sales)
    };

    if (editingProduct) {
      // Editar producto existente
      setProducts(prev =>
        prev.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p)
      );
      alert('✅ Producto actualizado correctamente');
    } else {
      // Agregar nuevo producto
      const newProduct = {
        id: Date.now(),
        ...productData
      };
      setProducts(prev => [...prev, newProduct]);
      alert('✅ Producto agregado correctamente');
    }

    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleToggleStock = (id) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, stock: p.stock > 0 ? 0 : Math.floor(Math.random() * 50) + 10 } : p
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro de eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      alert('🗑️ Producto eliminado');
    }
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCat === 'all' || p.category === filterCat;
    return matchesSearch && matchesCat;
  });

  const stats = {
    total: products.length,
    lowStock: products.filter(p => p.stock <= 10).length,
    totalSales: products.reduce((s, p) => s + p.sales, 0),
    totalValue: products.reduce((s, p) => s + p.price * p.stock, 0),
  };

  return (
    <div className="products-section">
      <div className="section-header">
        <h2>Gestión de Productos</h2>
        <p>Administra el catálogo de productos</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard icon="🍕" label="Productos" value={stats.total} />
        <StatCard icon="📦" label="Bajo Stock" value={stats.lowStock} />
        <StatCard icon="📈" label="Ventas totales" value={stats.totalSales} />
        <StatCard icon="💰" label="Valor inventario" value={`$${(stats.totalValue / 1000).toFixed(0)}K`} />
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar producto…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="all">Todas las categorías</option>
          <option value="clásica">Clásica</option>
          <option value="especial">Especial</option>
          <option value="gourmet">Gourmet</option>
        </select>
      </div>

      {/* Formulario en la misma página */}
      {showForm && (
        <div className="content-card" style={{ marginBottom: '20px', backgroundColor: '#f0f8ff' }}>
          <div className="form-header" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingBottom: '15px',
            borderBottom: '2px solid #000',
            marginBottom: '20px'
          }}>
            <h3>{editingProduct ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</h3>
            <button 
              onClick={handleCloseForm}
              style={{
                background: '#ff6b6b',
                color: 'white',
                border: '2px solid #000',
                padding: '8px 16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ✕ Cerrar
            </button>
          </div>
          
          <div className="product-form">
            <div className="form-group">
              <label htmlFor="name">
                Nombre del Producto <span style={{ color: '#ff6b6b' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Pixza Pepperoni"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `2px solid ${formErrors.name ? '#ff6b6b' : '#000'}`,
                  fontSize: '14px'
                }}
              />
              {formErrors.name && (
                <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  {formErrors.name}
                </span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
              <div className="form-group">
                <label htmlFor="price">
                  Precio <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  step="100"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `2px solid ${formErrors.price ? '#ff6b6b' : '#000'}`,
                    fontSize: '14px'
                  }}
                />
                {formErrors.price && (
                  <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                    {formErrors.price}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="stock">
                  Stock <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `2px solid ${formErrors.stock ? '#ff6b6b' : '#000'}`,
                    fontSize: '14px'
                  }}
                />
                {formErrors.stock && (
                  <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                    {formErrors.stock}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '20px' }}>
              <label htmlFor="category">
                Categoría <span style={{ color: '#ff6b6b' }}>*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `2px solid ${formErrors.category ? '#ff6b6b' : '#000'}`,
                  fontSize: '14px'
                }}
              >
                <option value="clásica">Clásica</option>
                <option value="especial">Especial</option>
                <option value="gourmet">Gourmet</option>
              </select>
              {formErrors.category && (
                <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  {formErrors.category}
                </span>
              )}
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              marginTop: '25px',
              paddingTop: '20px',
              borderTop: '2px solid #ddd'
            }}>
              <button 
                onClick={handleCloseForm}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#f4f4f4',
                  border: '2px solid #000',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubmit}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#4CAF50',
                  color: 'white',
                  border: '2px solid #000',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {editingProduct ? '💾 Guardar Cambios' : '➕ Agregar Producto'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="content-card">
        <div className="table-header">
          <h3>Lista de Productos ({filtered.length})</h3>
          <button 
            className="btn-action btn-primary" 
            onClick={() => handleOpenForm()}
            disabled={showForm}
            style={{ opacity: showForm ? 0.5 : 1 }}
          >
            + Añadir Producto
          </button>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🍕</div>
            <p>No se encontraron productos</p>
          </div>
        ) : (
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th><th>Nombre</th><th>Categoría</th>
                  <th>Precio</th><th>Stock</th><th>Ventas</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td><CategoryBadge cat={p.category} /></td>
                    <td>${p.price.toLocaleString()}</td>
                    <td><StockBadge stock={p.stock} /></td>
                    <td>{p.sales}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-action btn-toggle" 
                          onClick={() => handleToggleStock(p.id)} 
                          title="Alternar disponibilidad"
                        >
                          {p.stock ? '🔒' : '🔓'}
                        </button>
                        <button 
                          className="btn-action btn-role" 
                          onClick={() => handleOpenForm(p)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-action btn-delete" 
                          onClick={() => handleDelete(p.id)} 
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <h3>{label}</h3>
      <p className="stat-number">{value}</p>
    </div>
  </div>
);

const CategoryBadge = ({ cat }) => {
  const map = { clásica: 'Clásica', especial: 'Especial', gourmet: 'Gourmet' };
  return <span className="role-badge user">{map[cat] || cat}</span>;
};

const StockBadge = ({ stock }) => (
  <span className={`status-badge ${stock > 10 ? 'active' : 'inactive'}`}>
    {stock > 0 ? `${stock} u.` : 'Sin stock'}
  </span>
);

export default ProductsSection;