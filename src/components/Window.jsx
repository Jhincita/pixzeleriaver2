<<<<<<< HEAD
import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./window.css";

export default function Window({ title, children, isOpen, onClose }) {
    const ref = useRef(null);

    // Smooth open/close animation
    const styles = useSpring({
        transform: isOpen ? "scale(1)" : "scale(0.85)",
        opacity: isOpen ? 1 : 0,
        config: { tension: 160, friction: 18 },
    });

    // Center window on open or when content changes

    useEffect(() => {
        if(isOpen && ref.current) {
            const element = ref.current;
            element.style.top ="10vh";
            element.style.top = "10vh"; // position from top edge

        }
    })
    if (!isOpen) return null;

    return (
        <animated.div
            ref={ref}
            style={styles}
            className="window-container"
        >
            <div className="window-title">
                <span>{title}</span>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="window-content">
                {children}
            </div>
=======
// src/components/Window.jsx
import React from "react";
import { useSpring, animated } from "@react-spring/web";

export default function Window({ title, children, isOpen, onClose }) {
    // Spring for open/close animation
    const styles = useSpring({
        transform: isOpen ? "scale(1)" : "scale(0.7)", // window grows/shrinks
        //opacity: isOpen ? 1 : 0,                       // fade in/out
        config: { tension: 80, friction: 20 },
    });

    if (!isOpen) return null;

    return (
        <animated.div style={{ ...styles, position: 'relative', transformOrigin: 'center', zIndex: 1000 }}>
            <div className="window">
                <div className="window-title">
                    {title}
                    <button onClick={onClose} style={{ float: "right" }}>X</button>
                </div>
                <div className="page-content">{children}</div>
            </div>
>>>>>>> fcdb562 (arma tu pipsha)
        </animated.div>
    );
}
