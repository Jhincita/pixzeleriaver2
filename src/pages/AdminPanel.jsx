import { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import UsersSection from '../components/admin/UsersSection';
import ProductsSection from '../components/admin/ProductsSection';
import ReportsSection from '../components/admin/ReportsSection';
import OrdersSection from '../components/admin/OrdersSection';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersSection />;
      case 'products':
        return <ProductsSection />;
      case 'orders':
        return <OrdersSection />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSection()}
    </AdminLayout>
  );
};

export default AdminPanel;