import { useState } from "react";
import styles from "./styles.module.scss";

const Description = ({ children, slice = 200 }: IDescription) => {
  const [text, setText] = useState(children.slice(0, slice));

  const isReadMore = text.length >= slice;

  const isSliced = isReadMore && children !== text;

  const toggleText = () => {
    if (text.length <= 200) {
      setText(children);
    }
  };

  return (
    <div className={styles.description}>
      <p className={styles.text}>
        {text}
        {isSliced && " ... "}
        {isSliced && (
          <span
            onClick={() => {
              toggleText();
            }}
          >
            Read more
          </span>
        )}
      </p>
    </div>
  );
};

export default Description;

interface IDescription {
  children: string;
  slice?: number;
}
