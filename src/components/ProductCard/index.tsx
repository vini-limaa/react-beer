/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import Image from "next/image";
import IconPlus from "@images/icon-plus.png";

const ProductCard = ({
  name,
  image,
  price,
  action = () => {
    return;
  },
}: IProductCard) => {
  return (
    <div
      className={styles.productCard}
      onClick={() => {
        action();
      }}
    >
      <p className={styles.name}>{name}</p>
      <img src={image} alt="" />
      <div className={styles.bottom}>
        <div className={styles.price}>$ {price}</div>
        <button className={styles.cta}>
          <Image src={IconPlus} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

interface IProductCard {
  name: string;
  image: string;
  price: string | number;
  action?: VoidFunction;
}
