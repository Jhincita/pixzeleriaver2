import { render, screen, fireEvent } from '@testing-library/react';
import UsersSection from '../UsersSection';

const mockUsers = [
  { run: '11', name: 'Juan', lastname: 'P', email: 'j@mail.com', password: '123', role: 'user', status: 'active' },
  { run: '22', name: 'Ana',  lastname: 'G', email: 'a@mail.com', password: '456', role: 'admin', status: 'active' },
];

beforeEach(() => {
  localStorage.setItem('pixeleriaUsers', JSON.stringify(mockUsers));
});
afterEach(() => localStorage.clear());

test('Renderiza título de sección', () => {
  render(<UsersSection />);
  expect(screen.getByRole('heading', { name: /gestión de usuarios/i })).toBeInTheDocument();
});

test('Filtra usuarios por nombre', () => {
  render(<UsersSection />);
  fireEvent.change(screen.getByPlaceholderText(/buscar por nombre/i), { target: { value: 'Ana' } });
  expect(screen.getByText('Ana G')).toBeInTheDocument();
  expect(screen.queryByText('Juan P')).not.toBeInTheDocument();
});

test('Cambia estado con click', () => {
  render(<UsersSection />);

  const [primerBoton] = screen.getAllByTitle('Desactivar');
  fireEvent.click(primerBoton);

  const badges = screen.getAllByTestId('status-badge');
  expect(badges[0]).toHaveTextContent('Inactivo');
});