import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Button, ButtonDelete } from '../../../../components';
import { useAuth } from '../../../../hooks';
import { selectArticle, useDeleteArticleMutation } from '../../../../redux';
import { ButtonBookmark, ButtonLike } from './components';

import styles from './ActionButtons.module.scss';

export const ActionButtons = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const article = useSelector(selectArticle);

    const [deleteArticle] = useDeleteArticleMutation();

    const fromPage = location?.state?.from?.pathname;

    const authorId = article?.author?._id || 'deleted';
    const isOwner = user?.id === authorId;
    const isAdmin = user?.role === 'Admin';

    return (
        <div className={styles.root}>
            <div className={styles.buttonGroup}>
                {!isOwner && <ButtonBookmark variant="filledTonal">В закладки</ButtonBookmark>}
                {<ButtonLike variant="filledTonal">Нравится</ButtonLike>}
                {(isOwner || isAdmin) && (
                    <>
                        <Button
                            icon
                            variant="filledTonal"
                            onClick={() =>
                                navigate(`/articles/${id}/edit`, {
                                    state: { from: location },
                                })
                            }
                        >
                            <span className="material-symbols-outlined">edit</span>Изменить
                        </Button>

                        <ButtonDelete
                            icon
                            variant="filledTonal"
                            onPrimaryAction={() => {
                                deleteArticle(id);
                                navigate(fromPage ?? '/');
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
