import { useState, useEffect } from 'react';
import '../../styles/AdminPanel.css';

const ReportsSection = () => {
  const [range, setRange] = useState('week');
  const [report, setReport] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const base = range === 'week' ? 7 : range === 'month' ? 30 : 365;
      setReport({
        sales: { total: base * 152800, count: base * 24, growth: '+12%' },
        orders: { completed: base * 18, cancelled: base * 3, avgTicket: 6490 },
        products: { mostSold: 'Pixza Pepperoni', leastSold: 'Pixza Buffalina' },
        customers: { new: base * 8, returning: base * 12 },
      });
    }, 300);
  }, [range]);

  if (!report) {
    return (
      <div className="admin-loading">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Generando reporte…</p>
      </div>
    );
  }

  return (
    <div className="reports-section">
      <div className="section-header">
        <h2>📊 Reportes</h2>
        <p>Visualiza estadísticas de tu negocio</p>
      </div>

      <div className="filters-section">
        {['week', 'month', 'year'].map(r => (
          <button
            key={r}
            className={`btn-action ${range === r ? 'btn-primary' : ''}`}
            onClick={() => setRange(r)}
          >
            {r === 'week' ? 'Esta semana' : r === 'month' ? 'Este mes' : 'Este año'}
          </button>
        ))}
      </div>

      <div className="stats-grid">
        <StatCard icon="💵" label="Ventas" value={`$${(report.sales.total / 1000).toFixed(0)}K`} change={report.sales.growth} />
        <StatCard icon="📦" label="Órdenes" value={report.orders.completed} />
        <StatCard icon="🧑‍🤝‍🧑" label="Nuevos clientes" value={report.customers.new} />
        <StatCard icon="🎫" label="Ticket promedio" value={`$${report.orders.avgTicket.toLocaleString()}`} />
      </div>

      <div className="content-grid">
        <div className="content-card">
          <h3>Productos más / menos vendidos</h3>
          <p><strong>Más:</strong> {report.products.mostSold}</p>
          <p><strong>Menos:</strong> {report.products.leastSold}</p>
        </div>

        <div className="content-card">
          <h3>Estado de órdenes</h3>
          <p>✅ Completadas: <b>{report.orders.completed}</b></p>
          <p>❌ Canceladas: <b>{report.orders.cancelled}</b></p>
        </div>

        <div className="content-card">
          <h3>Clientes</h3>
          <p>Nuevos: <b>{report.customers.new}</b></p>
          <p>Recurrentes: <b>{report.customers.returning}</b></p>
        </div>

        <div className="content-card">
          <h3>Descargar</h3>
          <button className="btn-action btn-primary" style={{marginRight:8}}>📥 Excel</button>
          <button className="btn-action btn-primary">📄 PDF</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, change }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <h3>{label}</h3>
      <p className="stat-number">{value}</p>
      {change && <p className={`stat-change ${change.startsWith('+') ? 'positive' : 'negative'}`}>{change}</p>}
    </div>
  </div>
);

export default ReportsSection;