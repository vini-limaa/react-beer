import styles from "./styles.module.scss";

const Hero = ({ title, subtitle }: IHero) => {
  return (
    <div className={styles.hero}>
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default Hero;

interface IHero {
  title: string;
  subtitle: string;
}
