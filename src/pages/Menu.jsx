import "./Menu.css";
// importacion de imgs
import ProsciuttoPistacchio from "../assets/prosciuttopistaccio.png";
import PizzaPepperoni from "../assets/pepperoni.png";
import Prosciutto from "../assets/prosciuttorugula.png";
import Pizzamargherita from "../assets/pizzamargherita.png";
import PizzaDatterini from "../assets/pizzaDatterini.png";
import PizzaBuffalina from "../assets/pizzaBuffalina.png";

export default function Menu() {
    const menuItems = [
        { id: 1, name: "Pizza Margherita", price: "$8.000" , img: Pizzamargherita },
        {id: 2, name: "Pizza Prosciutto", price: "$8.000" , img: ProsciuttoPistacchio },
        {id: 3, name: "Pizza Pepperoni", price: "$8.000" , img: PizzaPepperoni },
        {id: 4, name: "Pizza Prosciutto", price: "$8.000" , img: Prosciutto },
        {id: 5, name: "Pizza Datterini", price: "$8.000" , img: PizzaDatterini },
        {id: 6, name: "Pizza Buffalina", price: "$8.000" , img: PizzaBuffalina },

    ];


    return (
        <div>
            <h2>Menú de Pizzas</h2>
            <ul className="menu-list">
                {menuItems.map((item) => (
                    <li key={item.id} className="menu-item">
                        <img src={item.img} alt={item.name} />
                        <div >
                            <h3>{item.name}</h3>
                            <h2>{item.price}</h2>
                            <div class="buttons">
                                <h2 class="buttons-minus">-</h2>
                                <h2 id={item.id} class="quantity">0</h2>
                                <h2 class="button-plus">+</h2>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>


        </div>
    );
}