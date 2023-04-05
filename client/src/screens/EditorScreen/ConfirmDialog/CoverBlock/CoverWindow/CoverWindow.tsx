import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Button from '@/components/common/Button/Button';

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

  if (isLoading) return <div className="cdx-loader" />;

  return (
    <div className={styles.coverContainer}>
      <img className={styles.coverImage} src={data?.cover} alt="Обложка статьи" />
      {data?.cover && (
        <Button className={styles.closeBtn} icon onClick={handleDeleteCover} variant="filledTonal">
          <span className="material-symbols-outlined">delete</span>
        </Button>
      )}
    </div>
  );
};
