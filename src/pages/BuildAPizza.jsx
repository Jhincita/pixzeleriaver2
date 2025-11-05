import "./buildapizza.css";


import Tray from "../assets/pizzatray.png";
import NewPizza from "../assets/newpizzabutton.png";

import React from "react";


export default function BuildAPizza() {
    return (
        <div className={"game-container"}>
            <div className={"top-area"}>
                <div className="tray-container">
                    <img src={Tray} alt="pizza tray" className="tray" />
                    <img src={NewPizza} alt="new pizza button" className="newpizzabutton" />
                </div>

            </div>
            <div className={"bottom-area"}>


            </div>

        </div>
    )
}