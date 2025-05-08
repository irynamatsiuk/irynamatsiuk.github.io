import { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

export function App() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const totalItems = countItems();
  const totalPrice = countPrices();

  function countItems() {
    let total = 0;
    if (selected.length > 0)
      selected.map((s) => {
        total = total + s.quantity;
      });
    return total;
  }

  function countPrices() {
    let total = 0;
    if (selected.length > 0)
      selected.map((s) => {
        total += s.quantity * products[s.index].price;
      });
    return total.toFixed(2);
  }

  return (
    <div className={styles.container}>
      <Navbar totalItems={totalItems} totalPrice={totalPrice} />
      <Outlet
        context={{
          products,
          setProducts,
          selected,
          setSelected,
          totalPrice,
          totalItems,
        }}
      />
    </div>
  );
}
