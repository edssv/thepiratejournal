import { ProgressCircle } from '@adobe/react-spectrum';
import { Button } from '@react-spectrum/button';
import React from 'react';

interface ButtonProgressProps {
    isLoading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'accent' | 'primary' | 'secondary' | 'negative';
    staticColor?: 'white' | 'black';
    style?: 'fill' | 'outline';
    onPress?: any;
    isDisabled?: boolean;
    ref?: any;
    children?: any;
}

export const ButtonProgress: React.FC<ButtonProgressProps> = ({
    isLoading,
    type,
    variant,
    staticColor,
    style,
    onPress,
    isDisabled,
    ref,
    children,
}) => {
    return (
        <Button
            ref={ref}
            onPress={onPress}
            isDisabled={isDisabled}
            type={type}
            variant={variant ? variant : 'accent'}
            staticColor={staticColor}
            style={style}>
            {isLoading && (
                <ProgressCircle size="S" isIndeterminate marginEnd="8px" aria-label="Loading…" />
            )}
            {children}
        </Button>
    );
};
