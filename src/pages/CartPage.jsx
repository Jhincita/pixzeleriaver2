export default function CartPage({ cart, setCart }) {
    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const updateQuantity = (id, amount) => {
        setCart(cart.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
                : item
        ));
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div>
            <h2>Carrito</h2>

            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {cart.map(({ id, name, price, quantity }) => (
                        <li
                            key={id}
                            style={{
                                marginBottom: "12px",
                                padding: "8px",
                                border: "1px solid #ddd",
                                borderRadius: "6px"
                            }}
                        >
                            <strong>{name}</strong> - ${price} c/u
                            <br />
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginTop: "6px"
                                }}
                            >
                                <button onClick={() => updateQuantity(id, -1)}>
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button onClick={() => updateQuantity(id, +1)}>
                                    +
                                </button>
                                <button onClick={() => removeItem(id)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <h3>Total: ${total.toFixed(2)}</h3>
        </div>
    );
}
