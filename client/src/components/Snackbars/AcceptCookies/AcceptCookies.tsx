import { useState } from 'react';

import Snackbar from '@/components/common/Snackbar/Snackbar';

import styles from './AcceptCookies.module.scss';

const AcceptCookies = () => {
  const isAcceptCookies = localStorage.getItem('isAcceptCookies');
  const [isOpen, setIsOpen] = useState(!isAcceptCookies);

  if (!isAcceptCookies) {
    return (
      <Snackbar
        accept
        permanent
        className={styles.root}
        isOpen={isOpen}
        position='center'
        onClose={() => {
          localStorage.setItem('isAcceptCookies', 'true');
          setIsOpen(false);
        }}
      >
        <span className='material-symbols-outlined'>info</span> Для правильной работы сайта нам
        необходимо использовать файлы cookie.
      </Snackbar>
    );
  }
  return null;
};

export default AcceptCookies;
