import styles from "./styles.module.scss";

const AddToCart = ({
  children,
  action = () => {
    return;
  },
}: IAddToCart) => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        action();
      }}
    >
      {children}
    </button>
  );
};

export default AddToCart;

interface IAddToCart {
  children: string;
  action?: VoidFunction;
}
