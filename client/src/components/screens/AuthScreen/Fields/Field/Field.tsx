import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import styles from './Field.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
  isError: boolean;
}

export const Input: React.FC<InputProps> = ({ isError, register, ...props }) => (
  <input className={clsx(styles.input, isError && styles.isInvalid)} {...register} {...props} />
);

export const Label: React.FC<PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>> = ({
  children,
  ...props
}) => (
  <label className={styles.label} htmlFor={props.htmlFor} {...props}>
    {children}
  </label>
);

export const ErrorLabel: React.FC<PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>> = ({
  children,
  ...props
}) => (
  <label className={clsx(styles.label, styles.errorLabel)} htmlFor={props.htmlFor} {...props}>
    {children}
  </label>
);

export const Field: React.FC<PropsWithChildren> = ({ children }) => <div className={styles.root}>{children}</div>;
