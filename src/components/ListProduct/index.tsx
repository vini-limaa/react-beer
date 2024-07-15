import { ReactNode } from "react";
import styles from "./styles.module.scss";

const ListProduct = ({ children }: IListProduct) => {
  return <div className={styles.listProduct}>{children}</div>;
};

export default ListProduct;

interface IListProduct {
  children?: ReactNode;
}
