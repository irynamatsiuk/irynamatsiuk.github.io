import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import styles from "./Card.module.css";

export const Card = (props) => {
  const { selected, setSelected } = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  function addToCart(i, q) {
    if (q === 0) return;
    // check if the item has been already added
    const isExist = (element) => element.index === i;
    const index = selected.findIndex(isExist);
    if (index != -1) {
      //if added, copy array, modify quantity and save in state
      const nextSelected = [...selected];
      nextSelected[index].quantity += q;
      setSelected(nextSelected);
      return;
    } else {
      // otherwise add new item to the array
      const newSelected = { index: i, quantity: q };
      setSelected([...selected, newSelected]);
    }
  }

  return (
    <div className={styles.card}>
      <p>{props.category}</p>
      <p className={styles.title}>{props.title}</p>
      <img src={props.image} alt={props.title} width="200px" height="200px" />
      <div className={styles.bottomBlock}>
        <p className={styles.price}>${props.price}</p>
        <div className={styles.quantity}>
          <button
            className={styles.quantityBtn}
            onClick={() => {
              if (quantity <= 1) return;
              setQuantity(quantity - 1);
            }}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            className={styles.input}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button
            className={styles.quantityBtn}
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <div className={styles.add}>
          <button
            className={styles.addBtn}
            onClick={() => addToCart(props.index, quantity)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
