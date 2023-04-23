import { useState } from 'react';

import Snackbar from '@/components/common/Snackbar/Snackbar';

import styles from './AcceptCookies.module.scss';

const AcceptCookies = () => {
  const isAcceptCookies = localStorage.getItem('isAcceptCookies');
  const [isOpen, setIsOpen] = useState(!isAcceptCookies);

  if (!isAcceptCookies) {
    return (
      <Snackbar
        className={styles.root}
        isOpen={isOpen}
        permanent
        accept
        onClose={() => {
          localStorage.setItem('isAcceptCookies', 'true');
          setIsOpen(false);
        }}
        position="center"
      >
        <span className="material-symbols-outlined">info</span> Для правильной работы сайта нам необходимо использовать
        файлы cookie.
      </Snackbar>
    );
  } else return null;
};

export default AcceptCookies;
