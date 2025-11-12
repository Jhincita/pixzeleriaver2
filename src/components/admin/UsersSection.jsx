import { useState, useEffect } from 'react';
import '../../styles/AdminPanel.css';

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    run: '',
    password: '',
    role: 'user',
    status: 'active'
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const usersFromStorage = JSON.parse(localStorage.getItem('pixeleriaUsers')) || [];
    setUsers(usersFromStorage);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    } else if (formData.name.length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!formData.lastname.trim()) {
      errors.lastname = 'El apellido es requerido';
    } else if (formData.lastname.length < 2) {
      errors.lastname = 'El apellido debe tener al menos 2 caracteres';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Email inválido';
    } else if (!editingUser && users.some(u => u.email === formData.email)) {
      errors.email = 'Este email ya está registrado';
    }
    
    const runRegex = /^\d{7,8}-[\dkK]$/;
    if (!formData.run.trim()) {
      errors.run = 'El RUN es requerido';
    } else if (!runRegex.test(formData.run)) {
      errors.run = 'Formato inválido (ej: 12345678-9)';
    } else if (!editingUser && users.some(u => u.run === formData.run)) {
      errors.run = 'Este RUN ya está registrado';
    }
    
    if (!editingUser) {
      if (!formData.password) {
        errors.password = 'La contraseña es requerida';
      } else if (formData.password.length < 6) {
        errors.password = 'Mínimo 6 caracteres';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenForm = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        run: user.run,
        password: '',
        role: user.role,
        status: user.status
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        lastname: '',
        email: '',
        run: '',
        password: '',
        role: 'user',
        status: 'active'
      });
    }
    setFormErrors({});
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setFormData({ name: '', lastname: '', email: '', run: '', password: '', role: 'user', status: 'active' });
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const userData = {
      name: formData.name.trim(),
      lastname: formData.lastname.trim(),
      email: formData.email.trim().toLowerCase(),
      run: formData.run.trim(),
      role: formData.role,
      status: formData.status
    };

    if (editingUser) {
      // Editar usuario existente
      const updatedUsers = users.map(u => 
        u.email === editingUser.email ? { ...u, ...userData } : u
      );
      setUsers(updatedUsers);
      localStorage.setItem('pixeleriaUsers', JSON.stringify(updatedUsers));
      alert('Usuario actualizado correctamente');
    } else {
      // Agregar nuevo usuario
      const newUser = {
        ...userData,
        password: formData.password // En producción, esto debería hashearse
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('pixeleriaUsers', JSON.stringify(updatedUsers));
      alert('Usuario creado correctamente');
    }

    handleCloseForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
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
      alert('No puedes eliminar al administrador principal');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      const updatedUsers = users.filter(user => user.email !== userEmail);
      setUsers(updatedUsers);
      localStorage.setItem('pixeleriaUsers', JSON.stringify(updatedUsers));
      alert('Usuario eliminado');
    }
  };

  const handleChangeRole = (userEmail) => {
    if (userEmail === 'admin@pixzeleria.com') {
      alert('No puedes cambiar el rol del administrador principal');
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
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
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

      {/* Formulario inline */}
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
            <h3>{editingUser ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}</h3>
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
            {/* Nombre y Apellido */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label htmlFor="name">
                  Nombre <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Juan"
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

              <div className="form-group">
                <label htmlFor="lastname">
                  Apellido <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder="Pérez"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `2px solid ${formErrors.lastname ? '#ff6b6b' : '#000'}`,
                    fontSize: '14px'
                  }}
                />
                {formErrors.lastname && (
                  <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                    {formErrors.lastname}
                  </span>
                )}
              </div>
            </div>

            {/* Email y RUN */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
              <div className="form-group">
                <label htmlFor="email">
                  Email <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="usuario@ejemplo.com"
                  disabled={editingUser !== null}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `2px solid ${formErrors.email ? '#ff6b6b' : '#000'}`,
                    fontSize: '14px',
                    backgroundColor: editingUser ? '#f0f0f0' : 'white',
                    cursor: editingUser ? 'not-allowed' : 'text'
                  }}
                />
                {formErrors.email && (
                  <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                    {formErrors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="run">
                  RUN <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <input
                  type="text"
                  id="run"
                  name="run"
                  value={formData.run}
                  onChange={handleInputChange}
                  placeholder="12345678-9"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `2px solid ${formErrors.run ? '#ff6b6b' : '#000'}`,
                    fontSize: '14px'
                  }}
                />
                {formErrors.run && (
                  <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                    {formErrors.run}
                  </span>
                )}
              </div>
            </div>

            {/* Contraseña (solo al crear) */}
            {!editingUser && (
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label htmlFor="password">
                  Contraseña <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mínimo 6 caracteres"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `2px solid ${formErrors.password ? '#ff6b6b' : '#000'}`,
                    fontSize: '14px'
                  }}
                />
                {formErrors.password && (
                  <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                    {formErrors.password}
                  </span>
                )}
              </div>
            )}

            {/* Rol y Estado */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
              <div className="form-group">
                <label htmlFor="role">
                  Rol <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #000',
                    fontSize: '14px'
                  }}
                >
                  <option value="user">👤 Usuario</option>
                  <option value="admin">🔐 Administrador</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">
                  Estado <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #000',
                    fontSize: '14px'
                  }}
                >
                  <option value="active">✅ Activo</option>
                  <option value="inactive">❌ Inactivo</option>
                </select>
              </div>
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
                {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de usuarios */}
      <div className="content-card">
        <div className="table-header">
          <h3>Lista de Usuarios ({filteredUsers.length})</h3>
          <button 
            className="btn-action btn-primary"
            onClick={() => handleOpenForm()}
            disabled={showForm}
            style={{ opacity: showForm ? 0.5 : 1 }}
          >
            + Añadir Usuario
          </button>
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
                      <span className={`status-badge ${user.status}`} data-testid="status-badge">
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
                          onClick={() => handleOpenForm(user)}
                          title="Editar usuario"
                        >
                          ✏️
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