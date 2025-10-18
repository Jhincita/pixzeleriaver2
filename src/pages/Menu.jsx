import "./Menu.css";
// importacion de imgs
import ProsciuttoPistacchio from "../assets/prosciuttopistaccio.png";
import PizzaPepperoni from "../assets/pepperoni.png";
import Prosciutto from "../assets/prosciuttorugula.png";
import Pizzamargherita from "../assets/pizzamargherita.png";
import PizzaDatterini from "../assets/pizzaDatterini.png";
import PizzaBuffalina from "../assets/pizzaBuffalina.png";

export default function Menu({ cart, setCart }) {

    const menuItems = [
        { id: 1, name: "Pizza Margherita", price: "8000" , img: Pizzamargherita },
        {id: 2, name: "Pizza Prosciutto", price: "10000" , img: ProsciuttoPistacchio },
        {id: 3, name: "Pizza Pepperoni", price: "9000" , img: PizzaPepperoni },
        {id: 4, name: "Pizza Prosciutto", price: "10000" , img: Prosciutto },
        {id: 5, name: "Pizza Datterini", price: "9000" , img: PizzaDatterini },
        {id: 6, name: "Pizza Buffalina", price: "10000" , img: PizzaBuffalina },

    ];


    const addToCart = (item) => {
        const exists = cart.find(pizza => pizza.id === item.id);
        if (exists) {
            setCart(
                cart.map(pizza =>
                    pizza.id === item.id
                        ? { ...pizza, quantity: pizza.quantity + 1 }
                        : pizza
                )
            );
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const decreaseFromCart = (item) => {
        const exists = cart.find(pizza => pizza.id === item.id);
        if (!exists) return;
        if (exists.quantity === 1) {
            setCart(cart.filter(pizza => pizza.id !== item.id));
        } else {
            setCart(
                cart.map(pizza =>
                    pizza.id === item.id
                        ? { ...pizza, quantity: pizza.quantity - 1 }
                        : pizza
                )
            );
        }
    };

    const getQuantity = (id) => {
        const item = cart.find(pizza => pizza.id === id);
        return item ? item.quantity : 0;
    };
    return (
        <div>
            <h2>Menú de Pizzas</h2>
            <ul className="menu-list">
                {menuItems.map((item) => (
                    <li key={item.id} className="menu-item">
                        <img src={item.img} alt={item.name} />
                        <div>
                            <h3>{item.name}</h3>
                            <h2>${item.price}</h2>
                            <div className="buttons">
                                <button
                                    className="buttons-minus"
                                    onClick={() => decreaseFromCart(item)}
                                >
                                    -
                                </button>

                                <span className="quantity">
                                    {getQuantity(item.id)}
                                </span>

                                <button
                                    className="button-plus"
                                    onClick={() => addToCart(item)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}