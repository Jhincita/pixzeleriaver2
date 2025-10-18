// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import CartPage from "./pages/CartPage.jsx";


// Window component
import Window from "./components/Window";

import './App.css';

export default function App() {
    const [openWindow, setOpenWindow] = useState(null);
    const [User, setUser] = useState(null);
    const [cart, setCart] = useState([]);



//pages.
    const pages = {
        home: <Home User={User} setUser={setUser} />,
        login: <Login User={User} setUser={setUser} />,
        menu: <Menu cart={cart} setCart={setCart} />,
        about: <About />,
        contact: <Contact />,
        blogs: <Blogs />,
        cart: <CartPage cart={cart} setCart={setCart} />,
    };

    return (
        <BrowserRouter>
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
                                {key.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Pop-up window */}
                <Window
                    title={openWindow ? openWindow.toUpperCase() : ""}
                    isOpen={!!openWindow}
                    onClose={() => setOpenWindow(null)}
                >
                    {openWindow && pages[openWindow]}
                </Window>
            </div>
        </BrowserRouter>
    );
}
