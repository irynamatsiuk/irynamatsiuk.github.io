import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.home}>
      <h3>Welcome to the Mock Shop</h3>
      <p>
        This is a Single Page Application built with React router. <br />
        Feel free to navigate between Home, Shop and Cart tabs. <br />
        The shop items are fetched from{" "}
        <a href="https://fakestoreapi.com/">FakeStore API</a>. <br /> Styling is
        organized in CSS modules. <br />
        <a href="https://github.com/irynamatsiuk/irynamatsiuk.github.io/tree/main/projects/shoppingcart">
          Source Code
        </a>
      </p>
    </div>
  );
};
