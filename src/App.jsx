// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import HomeImg from "./assets/navbar/home.svg"

import Login from "./pages/Login";
import LoginImg from "./assets/navbar/login.svg"
import Menu from "./pages/Menu";
import MenuImg from "./assets/navbar/menu.svg"
import About from "./pages/About";
import AboutImg from "./assets/navbar/about.svg"
import Contact from "./pages/Contact";
import ContactImg from "./assets/navbar/contact.svg"
import Blogs from "./pages/Blogs";
import BlogsImg from "./assets/navbar/blogs.svg"
import CartPage from "./pages/CartPage.jsx";
import CartImg from "./assets/navbar/cart.svg"
import BuildAPizza from "./pages/BuildAPizza.jsx";
import BuildAPizzaImg from "./assets/navbar/buildAPizza.svg"

import AdminPanel from "./pages/AdminPanel";

import Juego from './pages/Juego.jsx';
import Window from "./components/Window";


import './App.css';

function ProtectedAdminRoute({ children }) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || currentUser.role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    
    return children;
}

function MainPage({ User, setUser, cart, setCart, handleLoginSuccess }) {
    const [openWindow, setOpenWindow] = useState(null);

    const pages = {
        Home:{
            img: HomeImg,
            component: <Home User={User} setUser={setUser} />

        } ,
        login: {
            img: LoginImg,
            component: <Login User={User} setUser={setUser} onLoginSuccess={handleLoginSuccess} />
        },
        menu: {
            img: MenuImg,
            component: <Menu cart={cart} setCart={setCart} />
        } ,
        about:{
            img: AboutImg,
            component: <About />
        } ,
        contact: {
            img: ContactImg,
            component: <Contact />
        },
        blogs: {
            img: BlogsImg,
            component: <Blogs />
        },
        cart: {
            img: CartImg,
            component: <CartPage cart={cart} setCart={setCart} />

        },
        personalizar: {
            img: BuildAPizzaImg,
            component: <BuildAPizza setUser={setUser}/>

        }
    };
    return (
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
                    {Object.entries(pages).map(([key, { img }]) => (
                        <button
                            key={key}
                            className="nav-button"
                            onClick={() => setOpenWindow(key)}
                        >
                            <img
                                src={img}
                                alt={key}
                                className="nav-icon"
                            />
                            <span className="nav-label">
                    {key === 'personaliza'
                        ? 'PERSONALIZA'
                        : key.toUpperCase()}
                </span>
                        </button>
                    ))}
                </div>
            </nav>


            <Window
                title={openWindow ? openWindow.toUpperCase() : ""}
                isOpen={!!openWindow}
                onClose={() => setOpenWindow(null)}
            >
                {openWindow && pages[openWindow].component}
            </Window>
        </div>
    );
}

export default function App() {
    const [User, setUser] = useState(null);
    const [cart, setCart] = useState([]);

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

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    // Función para manejar login exitoso
    const handleLoginSuccess = (user) => {
        setUser(user);
    };

    return (
        <BrowserRouter basename="/pixzeleriaver2">
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <MainPage 
                            User={User} 
                            setUser={setUser} 
                            cart={cart} 
                            setCart={setCart}
                            handleLoginSuccess={handleLoginSuccess}
                        />
                    } 
                />

                <Route 
                    path="/admin" 
                    element={
                        <ProtectedAdminRoute>
                            <AdminPanel />
                        </ProtectedAdminRoute>
                    } 
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}