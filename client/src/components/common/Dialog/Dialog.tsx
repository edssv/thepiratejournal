import clsx from 'clsx';
import { useMediaPredicate } from 'react-media-hook';

import Button, { ButtonProps } from '@/components/common/Button/Button';

import styles from './Dialog.module.scss';

type DialogProps = {
  size?: 'S' | 'M' | 'L';
  mobileType?: 'modal' | 'fullscreen';
};

type DialogControlsProps = { className?: string };

type ActionButtonProps = ButtonProps<React.ElementType>;
type CancelButtonProps = ButtonProps<React.ElementType>;

export const DialogTitle: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.title}>{children}</div>;
};

export const DialogContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

export const DialogControls: React.FC<React.PropsWithChildren<DialogControlsProps>> = ({ children, className }) => {
  return <div className={clsx(className || styles.controls)}>{children}</div>;
};

export const DialogActionButton: React.FC<React.PropsWithChildren<ActionButtonProps>> = ({ children, ...props }) => {
  return (
    <Button className={styles.actionButton} {...props}>
      {children}
    </Button>
  );
};

export const DialogCancelButton: React.FC<React.PropsWithChildren<CancelButtonProps>> = ({ children, ...props }) => {
  return (
    <Button className={styles.cancelButton} {...props}>
      {children}
    </Button>
  );
};

export const Dialog: React.FC<React.PropsWithChildren<DialogProps>> = ({
  children,
  size = 'S',
  mobileType = 'modal',
}) => {
  const isMobile = useMediaPredicate('(max-width: 509.98px)');

  const setSize = () => {
    if (size === 'S') return 'smallDialog';
    if (size === 'M') return 'mediumDialog';
    if (size === 'L') return 'largeDialog';
  };

  const setMobileType = () => {
    if (isMobile) {
      if (mobileType === 'modal') return 'mobileModal';
      if (mobileType === 'fullscreen') return 'mobileFullscreen';
    } else return '';
  };

  return <div className={clsx(styles.root, setSize(), setMobileType())}>{children}</div>;
};
