import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import Button from '@/components/common/Button/Button';

import styles from './Snackbar.module.scss';

type SnackbarProps = {
  className?: string;
  position?: 'left' | 'center';
  permanent?: boolean;
  timeout?: number;
  isOpen: boolean;
  close?: boolean;
  accept?: boolean;
  onClose: () => void;
};

const Snackbar: React.FC<React.PropsWithChildren<SnackbarProps>> = ({
  accept = false,
  children,
  className,
  close = false,
  isOpen,
  onClose,
  permanent = false,
  position = 'left',
  timeout = 4000
}) => {
  const portalRoot = document.getElementById('portal-root') || new HTMLElement();

  useEffect(() => {
    if (!permanent) {
      setTimeout(() => onClose(), timeout);
    }
  }, [isOpen, onClose, permanent, timeout]);

  const setPosition = () => {
    if (position === 'left') return styles.left;
    if (position === 'center') return styles.center;
    return null;
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ bottom: 0, opacity: 1 }}
          className={`${styles.root} ${setPosition()} ${className ?? ''}`}
          exit={{ opacity: 0 }}
          style={{ bottom: -5, opacity: 0 }}
        >
          <p className={styles.supportingText}>{children}</p>
          {close && (
            <Button icon className={styles.close} onClick={onClose}>
              <span className='material-symbols-outlined'>close</span>
            </Button>
          )}
          {accept && <Button onClick={onClose}>Хорошо</Button>}
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot
  );
};

export default Snackbar;
