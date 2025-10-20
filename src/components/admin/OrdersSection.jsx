import { useState, useEffect } from 'react';
import '../../styles/AdminPanel.css';

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const mockOrders = [
      {
        id: '#1025',
        customer: 'Juan Pérez',
        email: 'juan@mail.com',
        date: '20 oct 2025',
        items: 3,
        total: 35970,
        status: 'completed',
      },
      {
        id: '#1024',
        customer: 'María González',
        email: 'maria@mail.com',
        date: '19 oct 2025',
        items: 2,
        total: 25980,
        status: 'pending',
      },
      {
        id: '#1023',
        customer: 'Carlos López',
        email: 'carlos@mail.com',
        date: '18 oct 2025',
        items: 1,
        total: 11990,
        status: 'cancelled',
      },
    ];
    setOrders(mockOrders);
  }, []);

  // Filtrar órdenes
  const filtered = orders.filter(order => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Estadísticas
  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    pending: orders.filter(o => o.status === 'pending').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.total, 0),
  };

  const getStatusBadge = (status) => {
    const map = {
      completed: { text: '✅ Completada', class: 'active' },
      pending:   { text: '⏳ Pendiente',  class: 'inactive' },
      cancelled: { text: '❌ Cancelada',  class: 'negative' },
    };
    return map[status] || { text: status, class: '' };
  };

  const handleChangeStatus = (orderId) => {
  setOrders(prev =>
    prev.map(order => {
      if (order.id === orderId) {
        let nextStatus;
        if (order.status === 'pending') nextStatus = 'completed';
        else if (order.status === 'completed') nextStatus = 'cancelled';
        else nextStatus = 'pending';

        return { ...order, status: nextStatus };
      }
      return order;
    })
  );
  };

  return (
    <div className="orders-section">
      <div className="section-header">
        <h2>📦 Gestión de Órdenes</h2>
        <p>Revisa y gestiona las órdenes de tus clientes</p>
      </div>

      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Total Órdenes</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Completadas</h3>
            <p className="stat-number">{stats.completed}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Pendientes</h3>
            <p className="stat-number">{stats.pending}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Ingresos</h3>
            <p className="stat-number">${stats.revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Buscar por cliente, email o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Todas las órdenes</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
          <option value="cancelled">Canceladas</option>
        </select>
      </div>

      <div className="content-card">
        <div className="table-header">
          <h3>Lista de Órdenes ({filtered.length})</h3>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📦</div>
            <p>No se encontraron órdenes</p>
          </div>
        ) : (
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Email</th>
                  <th>Fecha</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const badge = getStatusBadge(order.status);
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.email}</td>
                      <td>{order.date}</td>
                      <td>{order.items}</td>
                      <td>${order.total.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${badge.class}`}>
                          {badge.text}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-action btn-toggle" title="Cambiar estado" onClick={() => handleChangeStatus(order.id)}>🔄</button>
                          <button className="btn-action btn-delete" title="Eliminar" >🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersSection;