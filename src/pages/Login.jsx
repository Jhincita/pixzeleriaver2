// src/pages/Login.jsx
import React, { useState } from "react";
import Signup from "./Signup";
import Window from "../components/Window";

export default function Login({ User, setUser, onLoginSuccess, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [openWindow, setOpenWindow] = useState(null);

    const renderWindowContent = () => {
        switch (openWindow) {
            case "signup":
                return <Signup onClose={() => setOpenWindow(null)} />;
            default:
                return null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevenir cualquier propagación del evento

        console.log("🔵 Iniciando proceso de login...");
        console.log("Email ingresado:", email);

        // Validación básica
        const newErrors = { email: "", password: "" };
        if (!email) {
            newErrors.email = "El correo electrónico es obligatorio.";
        }
        if (!password) {
            newErrors.password = "La contraseña es obligatoria.";
        }
        
        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            console.log("✅ Validación pasada, buscando usuario...");
            
            // Obtener usuarios de localStorage
            const users = JSON.parse(localStorage.getItem('pixeleriaUsers')) || [];
            console.log("Total usuarios en DB:", users.length);
            
            // Buscar usuario con las credenciales proporcionadas
            const user = users.find(
                u => u.email === email && u.password === password
            );

            console.log("Usuario encontrado:", user ? "SÍ" : "NO");

            if (user) {
                console.log("Datos del usuario:", { name: user.name, role: user.role, status: user.status });
                
                // Verificar si el usuario está activo
                if (user.status === 'inactive') {
                    console.log("❌ Usuario inactivo");
                    setErrors({
                        email: "",
                        password: "Tu cuenta está inactiva. Contacta al administrador."
                    });
                    return;
                }

                // Login exitoso
                console.log("✅ Login exitoso:", user.name);
                console.log("🔑 Rol del usuario:", user.role);
                
                // Guardar usuario en localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log("💾 Usuario guardado en localStorage");
                
                // Actualizar estado del usuario
                setUser(user);
                
                // Verificar si es admin
                if (user.role === 'admin') {
                    console.log("🔐 ES ADMIN - Redirigiendo en 1 segundo...");
                    // Dar tiempo para ver los logs
                    setTimeout(() => {
                        console.log("➡️ Redirigiendo ahora a /pixzeleriaver2/admin");
                        window.location.href = '/pixzeleriaver2/admin';
                    }, 1000);
                } else {
                    console.log("👤 Usuario normal, cerrando ventana...");
                    // Llamar onLoginSuccess para usuarios normales
                    if (onLoginSuccess) {
                        onLoginSuccess(user);
                    }
                    // Cerrar ventana
                    if (onClose) {
                        onClose();
                    }
                }
            } else {
                console.log("❌ Credenciales incorrectas");
                // Credenciales incorrectas
                setErrors({
                    email: "",
                    password: "Correo o contraseña incorrectos."
                });
            }
        } else {
            console.log("❌ Errores de validación:", newErrors);
        }
    };

    return (
        <div className="form-wrapper">
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={100}
                        required
                        placeholder="ejemplo@correo.com"
                    />
                    <div className="error-message">{errors.email}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={4}
                        maxLength={10}
                        required
                    />
                    <div className="error-message">{errors.password}</div>
                </div>

<<<<<<< HEAD
                <button type="submit" className="pixel-button">
                    Ingresar
                </button>
=======
                <button type="submit" className="pixel-button">Ingresar</button>

>>>>>>> fcdb562 (arma tu pipsha)
            </form>

            <p>
                ¿No tienes cuenta?{" "}
                <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => setOpenWindow("signup")}
                >
                    Regístrate aquí
                </span>
            </p>

            <Window
                title={openWindow ? openWindow.toUpperCase() : ""}
                isOpen={!!openWindow}
                onClose={() => setOpenWindow(null)}
            >
                {renderWindowContent()}
            </Window>
        </div>
    );
}
