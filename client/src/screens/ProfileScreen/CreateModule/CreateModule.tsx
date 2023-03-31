import { useRouter } from 'next/navigation';

import Button from '../../../components/common/Button/Button';

import styles from './CreateModule.module.scss';

interface CreateModuleProps {
    variant: 'create' | 'find' | 'draft';
}

const CreateModule: React.FC<CreateModuleProps> = ({ variant }) => {
    const { push } = useRouter();

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.promt}>
                        <div className={styles.iconAndHeading}>
                            <div className={styles.icon}>
                                {variant === 'create' || variant === 'draft' ? (
                                    <span className="material-symbols-outlined">add_circle</span>
                                ) : (
                                    variant === 'find' && <span className="material-symbols-outlined">search</span>
                                )}
                            </div>
                            <Button
                                onClick={() =>
                                    variant === ('create' || 'draft') ? push('/articles/new') : push('/articles')
                                }
                                variant="outlined"
                            >
                                {variant === 'create' || variant === 'draft' ? 'Написать статью' : 'Найти статьи'}
                            </Button>
                        </div>
                        <div className={styles.text}>
                            {variant === 'create' ? (
                                <p>
                                    Получайте отзывы, просмотры и оценки. Общедоступные проекты также могут быть
                                    отмечены как «Популярные» нашими кураторами.
                                </p>
                            ) : (
                                variant === 'draft' && (
                                    <p>
                                        Ты сможешь получать оценки, а также собирать просмотры на опубликованных
                                        статьях.
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

export default CreateModule;
