import React from 'react';

interface SettingsButtonProps {
  heading: string;
  description?: string;
  children: React.ReactNode;
}

const SettingsButton: React.FC<SettingsButtonProps & React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  description,
  heading,
  ...restProps
}) => (
  <button className='my-8 w-full' {...restProps}>
    <span className='flex items-center justify-between'>
      <span className='flex flex-col text-left'>
        <span>{heading}</span>
        <span className='mt-1 text-on-surface-variant'>{description}</span>
      </span>
      <span className='flex items-center gap-4 text-on-surface-variant'>{children}</span>
    </span>
  </button>
);

export default SettingsButton;
