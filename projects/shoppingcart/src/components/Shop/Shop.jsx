import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card.jsx";
import styles from "./Shop.module.css";

export const Shop = () => {
  const { products, setProducts } = useOutletContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products", {
      mode: "cors",
      // TODO(imatsiuk): dig into CORS issue
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        const items = response.map((item) => ({
          ...item,
        }));
        setProducts(items);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error)
    return <p className={styles.error}>A network error was encountered</p>;

  return (
    <div className={styles.shop}>
      {products.map((product, i) => (
        <Card key={i} index={i} {...product} />
      ))}
    </div>
  );
};
