import clsx from 'clsx';
import type { ComponentProps, ElementType } from 'react';
import { MoonLoader } from 'react-spinners';

import styles from './Button.module.scss';

// const buttonVariants = cva(styles.root, {
//   variants: {
//     variant: {
//       filled: styles.filled,
//       outlined: styles.outlined,
//       elevated: styles.elevated,
//       filledTonal: styles.filledTonal,
//       text: styles.text
//     },
//     color: {
//       primary: styles.primary,
//       secondary: styles.secondary,
//       tertiary: styles.tertiary
//     }
//   },
//   defaultVariants: {
//     variant: 'text',
//     color: 'primary'
//   }
// });

export type Variant = 'elevated' | 'filled' | 'filledTonal' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'tertiary';

export interface ButtonOwnProps<E extends ElementType = ElementType> {
  /**
   * label
   */
  children: React.ReactNode;
  /**
   * loading
   */
  isLoading?: boolean;
  /**
   * is active
   */
  isActive?: boolean;
  /**
   * variant
   */
  variant?: Variant;
  /**
   * start icon
   */
  startIcon?: string;
  /**
   *  icon
   */
  icon?: boolean;
  /**
   * color
   */
  color?: ButtonColor;
  /**
   * weight
   */
  weight?: 'light' | 'normal' | 'medium';
  /**
   * class
   */
  className?: string;
  /**
   * html Type
   */
  as?: E;
}

// type ElevatedButtonProps = ButtonOwnProps & { variant: 'elevated'; color?: never };
// type FilledButtonProps = ButtonOwnProps & { variant: 'filled'; color?: never };
// type FilledTonalButtonProps = ButtonOwnProps & { variant: 'filledTonal'; color?: never };
// type OutlinedButtonProps = ButtonOwnProps & { variant: 'outlined'; color?: never };
// type TextButtonProps = ButtonOwnProps & { variant: 'text'; color?: ButtonColor };

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = 'button';

const Button = <E extends ElementType = typeof defaultElement>({
  as,
  children,
  className,
  color = 'primary',
  icon,
  isActive,
  isLoading,
  startIcon,
  variant = 'text',
  weight = 'normal',
  ...otherProps
}: ButtonProps<E>) => {
  const TagName = as || defaultElement;

  return (
    <TagName
      className={clsx(
        styles.root,
        startIcon && styles.startIcon,
        icon && styles.icon,
        isActive && styles.isActive,
        variant,
        `${color}Color`,
        styles[weight],
        className
      )}
      {...otherProps}
    >
      {isLoading && <MoonLoader color='var(--md-sys-color-primary)' size='14px' speedMultiplier={0.7} />}
      {startIcon && <span className='material-symbols-outlined'>{startIcon}</span>}
      {children}
    </TagName>
  );
};

export default Button;
