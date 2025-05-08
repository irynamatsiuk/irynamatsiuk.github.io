import { useOutletContext } from "react-router-dom";
import styles from "./Row.module.css";

export const Row = (props) => {
  const { selected, setSelected } = useOutletContext();

  function changeQuantity(newQuantity) {
    const nextSelected = selected.map((s) => {
      if (s.index == props.id) {
        return { ...s, quantity: newQuantity };
      } else {
        return s;
      }
    });
    setSelected(nextSelected.filter((s) => s.quantity !== 0));
  }

  return (
    <tr>
      <td>
        <img src={props.image} alt={props.title} width="50px" height="50px" />
      </td>
      <td className={styles.title}>{props.title}</td>
      <td>${props.price}</td>
      <td>
        <button onClick={() => changeQuantity(props.quantity - 1)}>-</button>
        {props.quantity}
        <button onClick={() => changeQuantity(props.quantity + 1)}>+</button>
      </td>
      <td>${props.subTotal.toFixed(2)}</td>
    </tr>
  );
};
