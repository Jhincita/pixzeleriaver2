import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import DraggableIngredient from "./DraggableIngredient.jsx";
import TrayDropZone from "./TrayDropZone.jsx";
import Tomato from "../../assets/ingredients/tomato.svg";

export default function BuildAPizza() {
    const [pizzaIngredients, setPizzaIngredients] = useState([]);

    const ingredients = [
        { id: "tomato", image: Tomato },
        // add more ingredients later
    ];

    const handleDragEnd = (event) => {
        const { over, active } = event;

        if (over && over.id === "tray") {
            const droppedIngredient = ingredients.find(
                (ing) => ing.id === active.id
            );

            if (droppedIngredient) {
                const position = {
                    x: 80 + Math.random() * 140,
                    y: 80 + Math.random() * 140,
                };

                setPizzaIngredients((prev) => [
                    ...prev,
                    { ...droppedIngredient, position },
                ]);
            }
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {/* Ingredient area (left or top of tray) */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "20px",
                }}
            >
                {ingredients.map((ingredient) => (
                    <DraggableIngredient
                        key={ingredient.id}
                        id={ingredient.id}
                        image={ingredient.image}
                        name={ingredient.id}
                    />
                ))}
            </div>

            {/* Pizza tray */}
            <TrayDropZone id="tray">
                {pizzaIngredients.map((item, index) => (
                    <img
                        key={index}
                        src={item.image}
                        alt={item.id}
                        style={{
                            position: "absolute",
                            left: item.position.x,
                            top: item.position.y,
                            width: "60px",
                            height: "60px",
                            pointerEvents: "none",
                        }}
                    />
                ))}
            </TrayDropZone>
        </DndContext>
    );
}
