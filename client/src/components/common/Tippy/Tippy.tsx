import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { RefAttributes } from 'react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useMediaPredicate } from 'react-media-hook';
import { usePopper } from 'react-popper';

import Button from '@/components/common/Button/Button';
import { useOnClickOutside } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './Tippy.module.scss';

interface TippyProps {
  tooltipPosition?: any;
  description?: string;
  title: string;
  offset?: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

type ComponentRootProps = React.HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> &
  Omit<TippyProps, 'isOpen'>;
interface ComponentProps extends ComponentRootProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Component: React.FC<ComponentProps> = ({ description, setIsOpen, title, ...otherProps }) => {
  const router = useRouter();

  return (
    <div className={styles.root} {...otherProps}>
      {' '}
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: 'linear' }}
      >
        <div className={styles.overlay} />
      </motion.div>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className={styles.dialog}
        exit={{ y: 2, opacity: 0 }}
        initial={{ y: 2, opacity: 0 }}
        transition={{ duration: 0.05, ease: 'linear' }}
      >
        <div className={styles.dialogPanel}>
          <div className={styles.dialogTitle}>{title}</div>
          <div className={styles.dialogDescription}>{description}</div>
          <div className={styles.dialogButtonGroup}>
            <Button variant='filled' onClick={() => setIsOpen(false)}>
              Не сейчас
            </Button>
            <Button
              variant='filledTonal'
              onClick={() => {
                setIsOpen(false);
                router.push(getPublicUrl.login());
              }}
            >
              Войти
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Tippy: React.FC<React.PropsWithChildren<TippyProps>> = ({
  children,
  description,
  isOpen,
  placement = 'right',
  setIsOpen,
  title
}) => {
  const portalRoot = document.getElementById('portal-root') || new HTMLElement();
  const tippyRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaPredicate('(max-width: 990.98px)');
  const { attributes, styles: popperStyles } = usePopper(buttonRef.current, tippyRef.current, {
    placement,

    modifiers: [{ name: 'offset', options: { offset: [0, 24] } }]
  });

  useEffect(() => {
    if (tippyRef?.current && isTablet) {
      disableBodyScroll(tippyRef?.current);

      if (!isOpen) enableBodyScroll(tippyRef?.current);
    }
  }, [isOpen, isTablet]);

  useOnClickOutside(tippyRef, () => setIsOpen(false));

  if (!isTablet) {
    return (
      <>
        <div ref={buttonRef}>{children}</div>
        {ReactDOM.createPortal(
          <div ref={tippyRef} style={popperStyles.popper} {...attributes}>
            <AnimatePresence>
              {isOpen && <Component description={description} setIsOpen={setIsOpen} title={title} />}
            </AnimatePresence>{' '}
          </div>,
          portalRoot
        )}
      </>
    );
  }

  return (
    <>
      <div ref={buttonRef}>{children}</div>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {isOpen && <Component description={description} setIsOpen={setIsOpen} title={title} />}
        </AnimatePresence>,
        portalRoot
      )}
    </>
  );
};

export default Tippy;
