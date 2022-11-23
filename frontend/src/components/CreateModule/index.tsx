import { Button } from '@react-spectrum/button';
import AddCircle from '@spectrum-icons/workflow/AddCircle';
import Search from '@spectrum-icons/workflow/Search';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CreateModule.module.scss';

interface CreateModuleProps {
    create?: boolean;
    find?: boolean;
    draft?: boolean;
}

export const CreateModule: React.FC<CreateModuleProps> = ({ create, find, draft }) => {
    const navigate = useNavigate();

    const findButton = <Button variant="secondary">Найти статьи</Button>;

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.promt}>
                        <div className={styles.iconAndHeading}>
                            <div className={styles.icon}>
                                {create || draft ? (
                                    <AddCircle size="M" color="informative" />
                                ) : (
                                    find && <Search color="informative" />
                                )}
                            </div>
                            <Button
                                onPress={() =>
                                    create || draft
                                        ? navigate('/articles/new')
                                        : navigate('/articles')
                                }
                                variant="secondary">
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
