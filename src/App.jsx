// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";

// Admin components
import AdminLogin from "./components/auth/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

import Window from "./components/Window";
import './App.css';

export default function App() {
    const [openWindow, setOpenWindow] = useState(null);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('pixeleriaUsers')) || [];
        const adminExists = users.some(user => user.email === 'admin@pixzeleria.com');
        
        if (!adminExists) {
            users.push({
                run: '12345678-9',
                name: 'Admin',
                lastname: 'Principal',
                email: 'admin@pixzeleria.com',
                password: 'admin123',
                role: 'admin',
                status: 'active'
            });
            localStorage.setItem('pixeleriaUsers', JSON.stringify(users));
        }
    }, []);

    const handleAdminLogin = () => {
        setOpenWindow(null);
        window.location.href = '/pixzeleriaver2/admin'; // ACTUALIZADO
    };

    const pages = {
        home: <Home />,
        login: <Login />,
        menu: <Menu />,
        about: <About />,
        contact: <Contact />,
        blogs: <Blogs />,
        admin: <AdminLogin onLoginSuccess={handleAdminLogin} />,
    };

    return (
        <BrowserRouter basename="/pixzeleriaver2"> {/* ← AGREGAR ESTO */}
            <Routes>
                {/* Ruta principal */}
                <Route path="/" element={
                    <div className="page-wrapper">
                        <header className="header">
                            <h1>
                                <img src="pixzeleria-logo.svg" alt="Pixzelería" />
                            </h1>
                        </header>

                        <p className="description">Pizzería en Pixeles</p>

                        <nav className="window">
                            <p className="window-title">Nav</p>
                            <div className="container">
                                {Object.keys(pages).map((key) => (
                                    <button
                                        key={key}
                                        className="button"
                                        onClick={() => setOpenWindow(key)}
                                    >
                                        {key === 'admin' ? '🔐 ADMIN' : key.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </nav>

                        <Window
                            title={openWindow ? openWindow.toUpperCase() : ""}
                            isOpen={!!openWindow}
                            onClose={() => setOpenWindow(null)}
                        >
                            {openWindow && pages[openWindow]}
                        </Window>
                    </div>
                } />

                {/* Ruta del panel de administración */}
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </BrowserRouter>
    );
}