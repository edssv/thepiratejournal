import Image from 'next/image';

import Button from '@/components/common/Button/Button';
import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './CoverWindow.module.scss';

interface CoverWindowProps {
  isLoading: boolean;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const CoverWindow: React.FC<CoverWindowProps> = ({ isLoading, setSelectedFile }) => {
  const { setCover } = useActions();

  const { data } = useTypedSelector((state) => state.editorPage);

  const handleDeleteCover = () => {
    setCover(null);
    setSelectedFile(null);
  };

  if (isLoading) return <div className='cdx-loader' />;

  return (
    <div className={styles.coverContainer}>
      {data?.cover && (
        <>
          <Image
            alt='Обложка статьи'
            className={styles.coverImage}
            height={0}
            sizes='100vw'
            src={data?.cover}
            width={0}
          />
          <Button icon className={styles.closeBtn} variant='filledTonal' onClick={handleDeleteCover}>
            <span className='material-symbols-outlined'>delete</span>
          </Button>
        </>
      )}
    </div>
  );
};
