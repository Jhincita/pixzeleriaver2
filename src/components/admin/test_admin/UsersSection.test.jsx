import { render, screen, fireEvent } from '@testing-library/react';
import UsersSection from '../UsersSection';

beforeEach(() => {
    const mockUsers = [
        {
            run: '11.111.111-1',
            name: 'Juan',
            lastname: 'Pérez',
            email: 'juan@test.com',
            password: '1234',
            role: 'user',
            status: 'active',
        },
    ];
    localStorage.setItem('pixeleriaUsers', JSON.stringify(mockUsers));
});

afterEach(() => localStorage.clear());

test('muestra título de sección', () => {
    render(<UsersSection />);
    expect(screen.getByRole('heading', { name: /gestión de usuarios/i })).toBeInTheDocument();
});

test('cambia estado al presionar botón', () => {
    render(<UsersSection />);

    const boton = screen.getByTitle(/Desactivar/i);
    fireEvent.click(boton);

    expect(screen.getByTestId('status-badge')).toHaveTextContent('Inactivo');
});