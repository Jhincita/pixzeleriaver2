import { useState, useEffect } from 'react';
import '../../styles/AdminPanel.css';

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const usersFromStorage = JSON.parse(localStorage.getItem('pixeleriaUsers')) || [];
    setUsers(usersFromStorage);
  };

  const handleToggleStatus = (userEmail) => {
    const updatedUsers = users.map(user => {
      if (user.email === userEmail) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem('pixeleriaUsers', JSON.stringify(updatedUsers));
  };

  const handleDeleteUser = (userEmail) => {
    if (userEmail === 'admin@pixzeleria.com') {
      alert('❌ No puedes eliminar al administrador principal');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      const updatedUsers = users.filter(user => user.email !== userEmail);
      setUsers(updatedUsers);
      localStorage.setItem('pixeleriaUsers', JSON.stringify(updatedUsers));
    }
  };

  const handleChangeRole = (userEmail) => {
    if (userEmail === 'admin@pixzeleria.com') {
      alert('❌ No puedes cambiar el rol del administrador principal');
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.email === userEmail) {
        return {
          ...user,
          role: user.role === 'admin' ? 'user' : 'admin'
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem('pixeleriaUsers', JSON.stringify(updatedUsers));
  };

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.lastname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.run || '').includes(searchTerm);

    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="users-section">
      <div className="section-header">
        <h2>Gestión de Usuarios</h2>
        <p>Administra los usuarios registrados en el sistema</p>
      </div>

      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Total Usuarios</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Activos</h3>
            <p className="stat-number">{stats.active}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h3>Inactivos</h3>
            <p className="stat-number">{stats.inactive}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔐</div>
          <div className="stat-info">
            <h3>Administradores</h3>
            <p className="stat-number">{stats.admins}</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, email o RUN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">📋 Todos los estados</option>
            <option value="active">✅ Activos</option>
            <option value="inactive">❌ Inactivos</option>
          </select>

          <select 
            value={filterRole} 
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="all">👤 Todos los roles</option>
            <option value="user">👤 Usuarios</option>
            <option value="admin">🔐 Administradores</option>
          </select>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="content-card">
        <div className="table-header">
          <h3>Lista de Usuarios ({filteredUsers.length})</h3>
        </div>

        {filteredUsers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔍</div>
            <p>No se encontraron usuarios con los filtros aplicados</p>
          </div>
        ) : (
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>RUN</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.email}>
                    <td>{user.run}</td>
                    <td>{user.name} {user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role === 'admin' ? '🔐 Admin' : '👤 Usuario'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.status}`} data-testid="status-badge" >
                        {user.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action btn-toggle"
                          onClick={() => handleToggleStatus(user.email)}
                          title={user.status === 'active' ? 'Desactivar' : 'Activar'}
                        >
                          {user.status === 'active' ? '🔒' : '🔓'}
                        </button>
                        <button
                          className="btn-action btn-role"
                          onClick={() => handleChangeRole(user.email)}
                          title="Cambiar rol"
                          disabled={user.email === 'admin@pixzeleria.com'}
                        >
                          🔄
                        </button>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDeleteUser(user.email)}
                          title="Eliminar"
                          disabled={user.email === 'admin@pixzeleria.com'}
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

export default UsersSection;