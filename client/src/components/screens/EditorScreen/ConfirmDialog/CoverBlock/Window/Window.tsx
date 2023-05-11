import Image from 'next/image';

import Button from '@/components/common/Button/Button';

import styles from './Window.module.scss';

interface WindowProps {
  isLoading: boolean;
  cover: string;
  handleDeleteCover: () => void;
}

export const Window: React.FC<WindowProps> = ({ cover, handleDeleteCover, isLoading }) => {
  if (isLoading) return <div className='cdx-loader' />;

  return (
    <div className={styles.coverContainer}>
      {cover && (
        <>
          <Image alt='Обложка статьи' className={styles.coverImage} height={0} sizes='100vw' src={cover} width={0} />
          <Button icon className={styles.closeBtn} variant='filledTonal' onClick={handleDeleteCover}>
            <span className='material-symbols-outlined'>delete</span>
          </Button>
        </>
      )}
    </div>
  );
};
