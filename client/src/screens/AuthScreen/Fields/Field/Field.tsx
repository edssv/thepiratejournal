import { PropsWithChildren } from 'react';

import styles from './Field.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
  isError: boolean;
}

export const Input: React.FC<InputProps> = ({ register, isError, ...props }) => {
  return <input className={`${styles.input} ${isError ? styles.isInvalid : ''}`} {...register} {...props} />;
};

export const Label: React.FC<PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>> = ({
  children,
  ...props
}) => {
  return (
    <label className={styles.label} {...props}>
      {children}
    </label>
  );
};

export const ErrorLabel: React.FC<PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>> = ({
  children,
  ...props
}) => {
  return (
    <label className={`${styles.label} ${styles.errorLabel}`} {...props}>
      {children}
    </label>
  );
};

export const Field: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
