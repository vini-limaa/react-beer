import styles from "./styles.module.scss";

import { Icon } from "@components";
import { IIcon } from "@components/Icon";
import { ReactNode } from "react";

const Nav = ({ leftIcon, rightIcon, children }: INav) => {
  return (
    <div className={styles.nav}>
      <div className={styles.leftIcon}>
        {leftIcon?.src && <Icon {...leftIcon} />}
      </div>
      <p className={styles.text}>{children}</p>
      <div className={styles.rightIcon}>
        <div className={styles.icon}>
          {rightIcon?.src && <Icon {...rightIcon} />}
        </div>
      </div>
    </div>
  );
};

export default Nav;

interface INav {
  leftIcon?: IIcon;
  rightIcon?: IIcon;
  children?: ReactNode;
}
