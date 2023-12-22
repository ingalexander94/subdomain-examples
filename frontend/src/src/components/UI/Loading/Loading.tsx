import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__animation}>
        <div></div>
        <div className={styles.loading__bounce_2}></div>
        <div className={styles.loading__bounce_3}></div>
      </div>
    </div>
  );
};

export default Loading;
