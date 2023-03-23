import { ComponentProps, ElementType } from 'react';
import { MoonLoader } from 'react-spinners';

import styles from './Button.module.scss';

export type Variant = 'elevated' | 'filled' | 'filledTonal' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'tertiary';

export interface ButtonOwnProps<E extends ElementType = ElementType> {
    children: any;
    isLoading?: boolean;
    isActive?: boolean;
    variant?: Variant;
    icon?: boolean;
    color?: ButtonColor;
    className?: string;
    as?: E;
}

// type ElevatedButtonProps = ButtonOwnProps & { variant: 'elevated'; color?: never };
// type FilledButtonProps = ButtonOwnProps & { variant: 'filled'; color?: never };
// type FilledTonalButtonProps = ButtonOwnProps & { variant: 'filledTonal'; color?: never };
// type OutlinedButtonProps = ButtonOwnProps & { variant: 'outlined'; color?: never };
// type TextButtonProps = ButtonOwnProps & { variant: 'text'; color?: ButtonColor };

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = 'button';

function Button<E extends ElementType = typeof defaultElement>({
    isLoading,
    isActive,
    children,
    variant = 'text',
    icon,
    color = 'primary',
    className,
    as,
    ...otherProps
}: ButtonProps<E>) {
    const TagName = as || defaultElement;

    const isSeveralChildren = Array.isArray(children) && children[1] !== null;

    return (
        <TagName
            className={`${styles.root} ${isSeveralChildren ? styles.iconWithText : ''} ${icon ? styles.icon : ''} ${
                isActive ? styles.isActive : ''
            } ${variant} ${color + 'Color'} ${className ?? ''}  label-large`}
            {...otherProps}
        >
            {isLoading && <MoonLoader size="14px" color="var(--md-sys-color-primary)" speedMultiplier={0.7} />}
            {children}
        </TagName>
    );
}

export default Button;
