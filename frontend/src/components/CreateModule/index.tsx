import { Button } from '@react-spectrum/button';
import AddCircle from '@spectrum-icons/workflow/AddCircle';
import Search from '@spectrum-icons/workflow/Search';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CreateModule.module.scss';

interface CreateModuleProps {
    create?: boolean;
    find?: boolean;
}

export const CreateModule: React.FC<CreateModuleProps> = ({ create, find }) => {
    const navigate = useNavigate();

    const findButton = <Button variant="secondary">Найти статьи</Button>;

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.promt}>
                        <div className={styles.iconAndHeading}>
                            <div className={styles.icon}>
                                {create ? (
                                    <AddCircle size="M" color="informative" />
                                ) : (
                                    find && <Search color="informative" />
                                )}
                            </div>
                            <Button
                                onPress={() =>
                                    create ? navigate('/writing') : navigate('/articles')
                                }
                                variant="secondary">
                                {create ? 'Написать статью' : 'Найти статьи'}
                            </Button>
                        </div>
                        <div className={styles.text}>
                            {create && (
                                <p>
                                    Получайте отзывы, просмотры и оценки. Общедоступные проекты
                                    также могут быть отмечены как «Популярные» нашими кураторами.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
