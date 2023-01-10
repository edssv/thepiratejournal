import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../';

import styles from './CreateModule.module.scss';

interface CreateModuleProps {
    create?: boolean;
    find?: boolean;
    draft?: boolean;
}

export const CreateModule: React.FC<CreateModuleProps> = ({ create, find, draft }) => {
    const navigate = useNavigate();

    const findButton = <Button variant="outlined">Найти статьи</Button>;

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.promt}>
                        <div className={styles.iconAndHeading}>
                            <div className={styles.icon}>
                                {create || draft ? (
                                    <span className="material-symbols-outlined">add_circle</span>
                                ) : (
                                    find && (
                                        <span className="material-symbols-outlined">search</span>
                                    )
                                )}
                            </div>
                            <Button
                                onClick={() =>
                                    create || draft
                                        ? navigate('/articles/new')
                                        : navigate('/articles')
                                }
                                variant="outlined">
                                {create || draft ? 'Написать статью' : 'Найти статьи'}
                            </Button>
                        </div>
                        <div className={styles.text}>
                            {create ? (
                                <p>
                                    Получайте отзывы, просмотры и оценки. Общедоступные проекты
                                    также могут быть отмечены как «Популярные» нашими кураторами.
                                </p>
                            ) : (
                                draft && (
                                    <p>
                                        Ты сможешь получать оценки, а также собирать просмотры на
                                        опубликованных статьях.
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
