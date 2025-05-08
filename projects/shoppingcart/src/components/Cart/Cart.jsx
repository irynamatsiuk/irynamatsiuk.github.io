import { useOutletContext } from "react-router-dom";
import { Row } from "../Row/Row.jsx";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

export const Cart = () => {
  const { products, selected, totalPrice, totalItems } = useOutletContext();

  return (
    <div className={styles.cart}>
      {selected.length > 0 ? (
        <table>
          <caption>Your order</caption>
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {selected.map((s) => (
              <Row
                key={s.index}
                id={s.index}
                image={products[s.index].image}
                title={products[s.index].title}
                price={products[s.index].price}
                quantity={s.quantity}
                subTotal={products[s.index].price * s.quantity}
              />
            ))}
            <tr>
              <td>Total</td>
              <td></td>
              <td></td>
              <td>{totalItems}</td>
              <td className={styles.totalPrice}>${totalPrice}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className={styles.emptyCart}>
          Oooops, your cart is empty, <br />
          Would you like to go back to the{" "}
          <Link to="/shop" className={styles.link}>
            Shop
          </Link>
          ?
        </p>
      )}
    </div>
  );
};
