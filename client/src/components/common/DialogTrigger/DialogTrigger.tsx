import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import styles from './DialogTrigger.module.scss';

interface DialogTriggerProps {
  isVisible?: boolean;
  clickOutside?: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogTrigger: React.FC<React.PropsWithChildren<DialogTriggerProps>> = ({
  children,
  isVisible,
  clickOutside = true,
  onClose
}) => {
  const portalRoot = document.getElementById('portal-root') || new HTMLElement();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef?.current) {
      disableBodyScroll(rootRef?.current);

      if (!isVisible) enableBodyScroll(rootRef?.current);
    }
  }, [isVisible]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isVisible && (
        <div ref={rootRef} className={styles.root}>
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          >
            <div
              aria-hidden='true'
              className={styles.overlay}
              onClick={clickOutside ? () => onClose(false) : () => {}}
            />
          </motion.div>
          {children}
        </div>
      )}
    </AnimatePresence>,
    portalRoot
  );
};

export default DialogTrigger;
