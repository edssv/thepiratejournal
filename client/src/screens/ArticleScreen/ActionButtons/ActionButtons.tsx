import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useDeleteArticleMutation } from '@/services';
import Button from '@/components/common/Button/Button';
import ButtonDelete from '@/components/Buttons/ButtonDelete';
import { ButtonLike } from './ButtonLike';
import { ButtonBookmark } from './ButtonBookmark';

import styles from './ActionButtons.module.scss';

export const ActionButtons = () => {
    const { push } = useRouter();
    const { user } = useAuth();

    const article = useTypedSelector((state) => state.articlePage.data);

    const { mutate: deleteArticle } = useDeleteArticleMutation();

    const authorId = article?.user?.id || 'deleted';
    const isOwner = user?.id === authorId;

    return (
        <div className={styles.root}>
            <div className={styles.buttonGroup}>
                {<ButtonLike variant="filledTonal">Нравится</ButtonLike>}
                {!isOwner && <ButtonBookmark variant="filledTonal">В закладки</ButtonBookmark>}
                {isOwner && (
                    <>
                        <Button variant="filledTonal" onClick={() => push(getPublicUrl.articleEdit(article.id))}>
                            <span className="material-symbols-outlined">edit</span>Изменить
                        </Button>

                        <ButtonDelete
                            variant="filledTonal"
                            onPrimaryAction={() => {
                                deleteArticle(String(article.id), { onSuccess: () => push('/') });
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
