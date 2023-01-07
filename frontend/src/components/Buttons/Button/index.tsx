import { ComponentProps, ElementType } from 'react';
import styled from '@emotion/styled';
import { ProgressCircle } from '@adobe/react-spectrum';

import styles from './Button.module.scss';

export type Variant = 'elevated' | 'filled' | 'filledTonal' | 'outlined' | 'text';
export interface ButtonOwnProps<E extends ElementType = ElementType> {
    children?: any;
    isLoading?: boolean;
    isActive?: boolean;
    variant?: Variant;
    icon?: boolean;
    className?: string | undefined;
    as?: E;
}

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
    Omit<ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = 'button';

export function Button<E extends ElementType = typeof defaultElement>({
    isLoading,
    isActive,
    children,
    variant,
    icon,
    className,
    as,
    ...otherProps
}: ButtonProps<E>) {
    const TagName = as || defaultElement;

    const elevated = variant === 'elevated';
    const filled = variant === 'filled';
    const filledTonal = variant === 'filledTonal';
    const outlined = variant === 'outlined';
    const text = variant === 'text';

    // console.log(Array.isArray(children) && children.find((item) => item === undefined));

    const BtnPrimary = styled.button`
        ${text && 'min-width: 48px'};
        padding: ${children.length === 2
            ? '0 24px 0 16px'
            : text
            ? children.length === 2
                ? '0 16px 0 12px'
                : '0 12px'
            : '0 24px'};
        background-color: ${elevated
            ? 'var(--md-sys-color-surface)'
            : filled
            ? 'var(--md-sys-color-primary)'
            : filledTonal
            ? 'var(--md-sys-color-secondary-container)'
            : outlined
            ? 'transparent'
            : text
            ? 'transparent'
            : ''};
        box-shadow: ${elevated
            ? 'var(--md-sys-elevation-1)'
            : filled
            ? 'var(--md-sys-elevation-level0), var(--md-sys-color-shadow)'
            : filledTonal
            ? 'var(--md-sys-elevation-level0), var(--md-sys-color-shadow)'
            : outlined
            ? 'box-shadow: var(--md-sys-elevation-level0)'
            : text
            ? 'box-shadow: var(--md-sys-elevation-level0), var(--md-sys-color-shadow)'
            : ''};
        color: ${elevated
            ? 'var(--md-sys-color-primary)'
            : filled
            ? 'var(--md-sys-color-on-primary)'
            : filledTonal
            ? 'var(--md-sys-color-on-secondary-container)'
            : outlined
            ? 'var(--md-sys-color-primary)'
            : text
            ? 'var(--md-sys-color-primary)'
            : ''};
        ${outlined && 'outline: 1px solid var(--md-sys-color-outline)'};

        :disabled {
            background-color: ${text ? '' : 'rgba(var(--md-sys-color-on-surfaceChannel), 0.12)'};
            color: ${text
                ? 'var(--md-sys-color-on-surface)'
                : 'rgba(var(--md-sys-color-on-surfaceChannel), 0.38)'};
            box-shadow: none;
            ${outlined && 'outline-color: rgba(var(--md-sys-color-on-surfaceChannel), 0.12)'}
            ${text && 'opacity: 38%'}
        }

        :hover {
            background-color: rgba(
                ${filledTonal
                    ? 'var(--md-sys-color-secondary-containerChannel), calc(1 - var(--md-sys-state-hover-state-layer-opacity))'
                    : filled
                    ? 'var(--md-sys-color-primaryChannel), calc(1 - var(--md-sys-state-hover-state-layer-opacity))'
                    : 'var(--md-sys-color-primaryChannel), var(--md-sys-state-hover-state-layer-opacity)'}
            );
            color: ${elevated
                ? 'var(--md-sys-color-primary)'
                : filled
                ? 'var(--md-sys-color-on-primary)'
                : ''};
            box-shadow: ${elevated
                ? 'var(--md-sys-elevation-2)'
                : filled || filledTonal
                ? 'var(--md-sys-elevation-level1), var(--md-sys-color-shadow)'
                : ''};
        }

        :focused {
            background-color: rgba(
                ${elevated || outlined || text
                    ? 'var(--md-sys-color-primaryChannel), var(--md-sys-state-focus-state-layer-opacity)'
                    : filled
                    ? 'var(--md-sys-color-primaryChannel), calc(1 - var(--md-sys-state-focus-state-layer-opacity))'
                    : filledTonal
                    ? 'var(--md-sys-color-secondary-containerChannel), calc(1 - var(--md-sys-state-focus-state-layer-opacity))'
                    : ''}
            );
        }

        :active {
            background-color: rgba(
                ${elevated || outlined || text
                    ? 'var(--md-sys-color-primaryChannel), var(--md-sys-state-pressed-state-layer-opacity)'
                    : filled
                    ? 'var(--md-sys-color-primaryChannel), calc(1 - var(--md-sys-state-pressed-state-layer-opacity))'
                    : filledTonal
                    ? 'var(--md-sys-color-secondary-containerChannel), calc(1 - var(--md-sys-state-pressed-state-layer-opacity))'
                    : ''}
            );
        }
    `;
    return (
        <BtnPrimary
            className={`${styles.button} ${
                icon &&
                (Array.isArray(children) && children[1] !== undefined
                    ? styles.iconButtonWithText
                    : styles.iconButton)
            } ${className} ${isActive && styles.isActive} label-large`}
            {...otherProps}>
            {isLoading && <ProgressCircle isIndeterminate size="S" />}
            {children}
        </BtnPrimary>
    );
}
