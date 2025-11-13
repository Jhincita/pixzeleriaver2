import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import DraggableIngredient from './DraggableIngredient.jsx';
import TrayDropZone from "./TrayDropZone.jsx";

import Tray from '../../assets/pizzatray.png';
import Tomato from '../../assets/ingredients/tomato.svg';

function BuildAPizza() {
    const [pizzaIngredients, setPizzaIngredients] = useState([]);

    const ingredients = [
        { id: 'tomato', image: Tomato },
        // Add more ingredients later
    ];

    const handleDragEnd = (event) => {
        const { over, active } = event;

        // Only act if dropped on the tray
        if (over && over.id === 'tray') {
            const droppedIngredient = ingredients.find((ing) => ing.id === active.id);
            if (droppedIngredient) {
                const position = {
                    x: 80 + Math.random() * 150,
                    y: 80 + Math.random() * 150,
                };
                setPizzaIngredients((prev) => [
                    ...prev,
                    { ...droppedIngredient, position },
                ]);
            }
        }
    };

    return (
        <div className="game-container">
            <h2>🍕 Build Your Pizza!</h2>

            <DndContext onDragEnd={handleDragEnd}>
                {/* Drop Zone (the tray) */}
                <TrayDropZone trayImage={Tray} pizzaIngredients={pizzaIngredients} />

                {/* Ingredient buttons */}
                <div className="ingredients-list">
                    {ingredients.map((ingredient) => (
                        <DraggableIngredient
                            key={ingredient.id}
                            id={ingredient.id}
                            image={ingredient.image}
                        >
                            <img src={ingredient.image} alt={ingredient.id} width="60" />
                        </DraggableIngredient>
                    ))}
                </div>
            </DndContext>
        </div>
    );
}

export default BuildAPizza;
