// src/components/Window.jsx
import React from "react";

export default function Window({ title, children, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="window">
            <div className="window-title">
                {title}
                <button onClick={onClose} style={{ float: "right" }}>X</button>
            </div>
            <div className="page-content">{children}</div>
        </div>
    );
}
