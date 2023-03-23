import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from '@/hooks';
import { articleDataSelector, useDeleteArticleMutation } from '@/store';
import Button from '@/components/Buttons/Button/Button';
import { ButtonBookmark, ButtonDelete, ButtonLike } from './components';

import styles from './ActionButtons.module.scss';

export const ActionButtons = () => {
    const pathname = usePathname();
    const { push } = useRouter();
    const { user } = useAuth();

    const article = useSelector(articleDataSelector);

    const [deleteArticle] = useDeleteArticleMutation();

    const authorId = article?.author?._id || 'deleted';
    const isOwner = user?.id === authorId;

    return (
        <div className={styles.root}>
            <div className={styles.buttonGroup}>
                {<ButtonLike variant="filledTonal">Нравится</ButtonLike>}
                {!isOwner && <ButtonBookmark variant="filledTonal">В закладки</ButtonBookmark>}
                {isOwner && (
                    <>
                        <Button variant="filledTonal" onClick={() => push(`/articles/${id}/edit`)}>
                            <span className="material-symbols-outlined">edit</span>Изменить
                        </Button>

                        <ButtonDelete
                            variant="filledTonal"
                            onPrimaryAction={() => {
                                deleteArticle(id);
                                push('/');
                            }}
                        >
                            <span className="material-symbols-outlined">delete</span>Удалить
                        </ButtonDelete>
                    </>
                )}
            </div>
        </div>
    );
};
