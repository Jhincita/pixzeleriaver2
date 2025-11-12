import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import UsersSection from '../UsersSection';

describe('UsersSection - Tests Mínimos', () => {
  
  beforeEach(() => {
    const mockUsers = [
      {
        name: 'Ana',
        lastname: 'G',
        email: 'ana@test.com',
        run: '12345678-9',
        role: 'user',
        status: 'active'
      },
      {
        name: 'Juan',
        lastname: 'P',
        email: 'juan@test.com',
        run: '98765432-1',
        role: 'user',
        status: 'active'
      }
    ];
    
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'pixeleriaUsers') {
        return JSON.stringify(mockUsers);
      }
      return null;
    });
    
    vi.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Renderiza título de sección', () => {
    render(<UsersSection />);
    expect(screen.getByText('Gestión de Usuarios')).toBeInTheDocument();
  });

  test('Filtra usuarios por nombre', () => {
    render(<UsersSection />);
    
    const searchInput = screen.getByPlaceholderText(/buscar por nombre/i);
    fireEvent.change(searchInput, { target: { value: 'Ana' } });
    
    expect(screen.getByText(/Ana G/i)).toBeInTheDocument();
    expect(screen.queryByText(/Juan P/i)).not.toBeInTheDocument();
  });

  test('Cambia estado con click', () => {
    render(<UsersSection />);
    
    const toggleButtons = screen.getAllByTitle('Desactivar');
    expect(toggleButtons.length).toBeGreaterThan(0);
    
    fireEvent.click(toggleButtons[0]);
    

    expect(localStorage.setItem).toHaveBeenCalled();
  });
});