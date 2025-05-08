import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className={styles.error}>
      <h3>
        <i>{error.statusText || error.message}</i>
      </h3>
      <h4>Ooops, this page doesn't exist!</h4>

      <Link to="/shop">
        You can go back to the Shop by clicking here, though!
      </Link>
    </div>
  );
};
