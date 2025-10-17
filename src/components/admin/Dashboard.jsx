const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <div className="stat-info">
            <h3>Ventas Hoy</h3>
            <p className="stat-number">$152,800</p>
            <p className="stat-change positive">+12%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>Usuarios Registrados</h3>
            <p className="stat-number">1,258</p>
            <p className="stat-change positive">+8%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-pizza-slice"></i>
          </div>
          <div className="stat-info">
            <h3>Órdenes Pendientes</h3>
            <p className="stat-number">24</p>
            <p className="stat-change negative">-3%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-star"></i>
          </div>
          <div className="stat-info">
            <h3>Productos Más Vendidos</h3>
            <p className="stat-number">5</p>
            <p className="stat-change">Destacados</p>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <h3>Productos Más Vendidos</h3>
          <div className="best-sellers-list">
            {[
              { name: "Pixza Pepperoni", sales: 152, revenue: "1.4M" },
              { name: "Pixza Margarita", sales: 128, revenue: "1.1M" },
              { name: "Pixza Hawaiana", sales: 98, revenue: "890K" },
              { name: "Pixza Cuatro Quesos", sales: 76, revenue: "720K" },
              { name: "Pixza Vegetariana", sales: 64, revenue: "580K" }
            ].map((product, index) => (
              <div key={index} className="product-item">
                <div className="product-info">
                  <span className="product-rank">{index + 1}</span>
                  <span className="product-name">{product.name}</span>
                </div>
                <div className="product-stats">
                  <span className="sales-count">{product.sales} ventas</span>
                  <span className="revenue">${product.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card">
          <h3>Nuevos Usuarios Registrados</h3>
          <div className="new-users-list">
            {[
              { name: "Juan Perez", time: "Hoy, 14:30" },
              { name: "Maria Gonzalez", time: "Hoy, 12:45" },
              { name: "Carlos Lopez", time: "Hoy, 10:20" },
              { name: "Ana Martinez", time: "Ayer, 18:40" }
            ].map((user, index) => (
              <div key={index} className="user-item">
                <div className="user-avatar-small">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="user-info-item">
                  <span className="user-name-item">{user.name}</span>
                  <span className="user-time">{user.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background-color: #fff;
          border: 2px solid #000;
          padding: 20px;
          display: flex;
          align-items: center;
          box-shadow: 4px 4px 0 #000;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          background-color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          color: #fff;
          font-size: 1.5rem;
        }

        .stat-info h3 {
          margin: 0 0 5px;
          font-size: 0.9rem;
          color: #666;
        }

        .stat-number {
          margin: 0;
          font-size: 1.8rem;
          font-weight: bold;
          color: #000;
        }

        .stat-change {
          margin: 5px 0 0;
          font-size: 0.9rem;
        }

        .stat-change.positive {
          color: #28a745;
        }

        .stat-change.negative {
          color: #dc3545;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
        }

        .content-card {
          background-color: #fff;
          border: 2px solid #000;
          padding: 20px;
          box-shadow: 4px 4px 0 #000;
        }

        .content-card h3 {
          margin-top: 0;
          border-bottom: 2px solid #000;
          padding-bottom: 10px;
        }

        .best-sellers-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 15px;
        }

        .product-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }

        .product-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .product-rank {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background-color: #000;
          color: #fff;
          border-radius: 50%;
          font-weight: bold;
          font-size: 0.8rem;
        }

        .product-item:nth-child(1) .product-rank {
          background-color: #FFD700;
          color: #000;
        }

        .product-item:nth-child(2) .product-rank {
          background-color: #C0C0C0;
          color: #000;
        }

        .product-item:nth-child(3) .product-rank {
          background-color: #CD7F32;
          color: #fff;
        }

        .product-name {
          font-weight: bold;
        }

        .product-stats {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .sales-count {
          font-weight: bold;
          color: #000;
        }

        .revenue {
          font-size: 0.8rem;
          color: #28a745;
        }

        .new-users-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 15px;
        }

        .user-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .user-avatar-small {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #667eea;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.8rem;
        }

        .user-info-item {
          display: flex;
          flex-direction: column;
        }

        .user-name-item {
          font-weight: bold;
          color: #000;
        }

        .user-time {
          font-size: 0.8rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;