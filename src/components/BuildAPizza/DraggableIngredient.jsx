import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DraggableIngredient({ id, image, name }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
        cursor: "grab",
        width: "60px",
        height: "60px",
        background: "none",
        border: "none",
        padding: 0,
        margin: "10px",
    };

    return (
        <img
            ref={setNodeRef}
            src={image}
            alt={name}
            style={style}
            {...listeners}
            {...attributes}
        />
    );
}
