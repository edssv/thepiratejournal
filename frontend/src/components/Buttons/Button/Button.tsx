import React, { ComponentProps, ElementType } from 'react';
import styled from '@emotion/styled';
import { MoonLoader } from 'react-spinners';

import styles from './Button.module.scss';

export type Variant = 'elevated' | 'filled' | 'filledTonal' | 'outlined' | 'text';

export interface ButtonOwnProps<E extends ElementType = ElementType> {
    children: any;
    isLoading?: boolean;
    isActive?: boolean;
    variant?: Variant;
    icon?: boolean;
    color?: string;
    className?: string | undefined;
    as?: E;
}

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = 'button';

export function Button<E extends ElementType = typeof defaultElement>({
    isLoading,
    isActive,
    children,
    variant = 'text',
    icon,
    color,
    className,
    as,
    ...otherProps
}: ButtonProps<E>) {
    const TagName = as || defaultElement;

    const text = variant === 'text';

    const BtnPrimary = styled.button`
        ${text && 'min-width: 48px'};
        padding: ${(Array.isArray(children) && children[1] !== null) || children.type === React.Fragment
            ? '0 24px 0 16px'
            : text
            ? (Array.isArray(children) && children[1] !== null) || children.type === React.Fragment
                ? '0 16px 0 12px'
                : '0 12px'
            : '0 24px'};
        color: ${color};
    `;

    return (
        <BtnPrimary
            className={`${styles.button} ${
                icon &&
                (Array.isArray(children) && children[1] !== null ? styles.iconButtonWithText : styles.iconButton)
            } ${className} ${isActive && styles.isActive} ${variant} label-large`}
            {...otherProps}
        >
            {isLoading && <MoonLoader size="14px" color="var(--md-sys-color-primary)" speedMultiplier={0.7} />}
            {children}
        </BtnPrimary>
    );
}
