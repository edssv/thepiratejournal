import styles from './StepsIndicator.module.scss';

const StepsIndicator: React.FC<{ step?: number }> = ({ step }) => (
  <div className={styles.root}>Шаг {step} из 2</div>
);

export default StepsIndicator;
