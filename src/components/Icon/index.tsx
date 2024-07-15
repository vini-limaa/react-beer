import styles from "./styles.module.scss";
import Image, { StaticImageData } from "next/image";

const Icon = ({
  src = "",
  rounded,
  action = () => {
    return;
  },
  image,
}: IIcon) => {
  return (
    <div
      className={`${styles.icon} ${rounded ? styles.rounded : ""} ${
        rounded ? styles.image : ""
      }`}
      onClick={() => {
        action();
      }}
    >
      <Image src={src} alt="" />
    </div>
  );
};

export default Icon;

export interface IIcon {
  src: string | StaticImageData;
  rounded?: boolean;
  action?: VoidFunction;
  image?: boolean;
}
