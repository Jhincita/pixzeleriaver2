import { useState, useEffect } from 'react';
import '../../styles/AdminPanel.css';

const ProductsSection = () => {
  const [products, setProducts]   = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat]   = useState('all');

  useEffect(() => {
    const defaultProducts = [
      { id: 1, name: 'Pixza Pepperoni',  price: 9000, stock: 42, category: 'pizza', sales: 152 },
      { id: 2, name: 'Pixza Margherita',  price: 8000, stock: 30, category: 'pizza', sales: 128 },
      { id: 3, name: 'Pixza Prosciutto',   price: 10000, stock: 18, category: 'pizza', sales: 98  },
      { id: 4, name: 'Pixza Datterini',  price: 9000,  stock: 99, category: 'pizza', sales: 240 },
      { id: 5, name: 'Pixza Buffalina',price: 10000, stock: 25, category: 'pizza', sales: 60 },
    ];
    setProducts(defaultProducts);
  }, []);

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
    }
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat    = filterCat === 'all' || p.category === filterCat;
    return matchesSearch && matchesCat;
  });

  const stats = {
    total:   products.length,
    lowStock: products.filter(p => p.stock <= 10).length,
    totalSales: products.reduce((s, p) => s + p.sales, 0),
    totalValue: products.reduce((s, p) => s + p.price * p.stock, 0),
  };

  /* ----------  RENDER  ---------- */
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
            placeholder="🔍 Buscar producto…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="all">Todas las categorías</option>
          <option value="pizza">Pizzas</option>
          <option value="drink">Bebidas</option>
          <option value="dessert">Postres</option>
        </select>
      </div>

      {/* Table */}
      <div className="content-card">
        <div className="table-header">
          <h3>Lista de Productos ({filtered.length})</h3>
          <button className="btn-action btn-primary">+ Añadir Producto</button>
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
                        <button className="btn-action btn-toggle" onClick={() => handleToggleStock(p.id)} title="Alternar disponibilidad">
                          {p.stock ? '🔒' : '🔓'}
                        </button>
                        <button className="btn-action btn-role" title="Editar">✏️</button>
                        <button className="btn-action btn-delete" onClick={() => handleDelete(p.id)} title="Eliminar">🗑️</button>
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
  const map = { pizza: 'Pizza', drink: 'Bebida', dessert: 'Postre' };
  return <span className="role-badge user">{map[cat] || cat}</span>;
};

const StockBadge = ({ stock }) => (
  <span className={`status-badge ${stock > 10 ? 'active' : 'inactive'}`}>
    {stock > 0 ? `${stock} u.` : 'Sin stock'}
  </span>
);

export default ProductsSection;