import styles from "./styles.module.scss";

const Button = ({
  children,
  actived,
  action = () => {
    return;
  },
}: IButton) => {
  return (
    <div
      className={`${styles.button} ${actived ? styles.actived : ""}`}
      onClick={() => {
        action();
      }}
    >
      {children}
    </div>
  );
};

export default Button;

interface IButton {
  children: string;
  actived?: boolean;
  action?: VoidFunction;
}
