import Image from "next/image";
import styles from "./styles.module.scss";
import IconBag from "@images/icon-bag.png";

const CartButton = ({
  action = () => {
    return;
  },
}: ICartButton) => {
  return (
    <div
      className={styles.button}
      onClick={() => {
        action();
      }}
    >
      <Image src={IconBag} alt="" />
    </div>
  );
};

export default CartButton;

interface ICartButton {
  action?: VoidFunction;
}
