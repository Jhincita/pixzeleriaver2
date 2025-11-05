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
        </animated.div>
    );
}
