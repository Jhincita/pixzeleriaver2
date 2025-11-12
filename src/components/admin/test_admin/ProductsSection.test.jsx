import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import ProductsSection from '../ProductsSection.jsx';

describe('ProductsSection', () => {
  
  test('debería mostrar las estadísticas de productos', () => {
    render(<ProductsSection />);
    
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Bajo Stock')).toBeInTheDocument();
    expect(screen.getByText('Ventas totales')).toBeInTheDocument();
    expect(screen.getByText('Valor inventario')).toBeInTheDocument();
  });

  test('debería filtrar productos por nombre', () => {
    render(<ProductsSection />);
    
    const searchInput = screen.getByPlaceholderText('Buscar producto…');
    fireEvent.change(searchInput, { target: { value: 'Pepperoni' } });
    
    expect(screen.getByText('Pixza Pepperoni')).toBeInTheDocument();
    expect(screen.queryByText('Pixza Margherita')).not.toBeInTheDocument();
  });

  test('debería abrir el formulario al hacer clic en "Añadir Producto"', () => {
    render(<ProductsSection />);
    
    const addButton = screen.getByText('+ Añadir Producto');
    fireEvent.click(addButton);
    
    expect(screen.getByText('➕ Nuevo Producto')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre del Producto/i)).toBeInTheDocument();
  });

  test('debería mostrar errores de validación cuando los campos están vacíos', async () => {
    render(<ProductsSection />);
    
    const addButton = screen.getByText('+ Añadir Producto');
    fireEvent.click(addButton);
    
    const submitButton = screen.getByText('➕ Agregar Producto');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es requerido')).toBeInTheDocument();
      expect(screen.getByText('El precio debe ser mayor a 0')).toBeInTheDocument();
    });
  });

  test('debería eliminar un producto después de confirmar', () => {
    global.confirm = vi.fn(() => true);
    
    render(<ProductsSection />);
    
    const deleteButtons = screen.getAllByTitle('Eliminar');
    const initialProductCount = deleteButtons.length;
    
    fireEvent.click(deleteButtons[0]);
    
    expect(global.confirm).toHaveBeenCalledWith('¿Seguro de eliminar este producto?');
    
    const remainingButtons = screen.getAllByTitle('Eliminar');
    expect(remainingButtons.length).toBe(initialProductCount - 1);
  });
});