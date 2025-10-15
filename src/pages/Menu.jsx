import "./Menu.css";
// importacion de imgs
import PizzaMargherita from "../assets/pizzamargherita.svg";
import Crudo from "../assets/crudo.svg";

export default function Menu() {
    const menuItems = [
        { id: 1, name: "Pizza Margherita", price: "$8.000" , img: PizzaMargherita },
        {id: 2, name: "Pizza Prosciutto", price: "$8.000" , img: Crudo }

    ];


    return (
        <div>
            <h2>Menú de Pizzas</h2>
            <ul className="menu-list">
                {menuItems.map((item) => (
                    <li key={item.id} className="menu-item">
                        <img src={item.img} alt={item.name} />
                        <div>
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                        </div>
                    </li>
                ))}
            </ul>


        </div>
    );
}