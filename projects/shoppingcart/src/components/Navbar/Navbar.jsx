import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import icon from "../../assets/icons/cart-shopping-regular.svg";

export const Navbar = (props) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
        <Link to="/home" className={styles.link}>
          Home
        </Link>
        <Link to="/shop" className={styles.link}>
          Shop
        </Link>
      </div>
      <div className={styles.cart}>
        <img src={icon} alt="Cart" />
        <Link to="/cart" className={styles.link}>
          <div>
            <p> ({props.totalItems})</p>
            <p>${props.totalPrice}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
