'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/Buttons/Button';

import styles from './HomeHeader.module.scss';

export const HomeHeader = () => {
    const { push } = useRouter();

    return (
        <div id="homeHeader" className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.text}>
                    <h2>Начни чтение</h2>
                    <p className={styles.description}>
                        Присоединяйся к The Pirate Journal. Открой для себя новый контент,
                        возможность делиться и обсуждать новые статьи.
                    </p>
                </div>
                <Button onClick={() => push('/signup')} variant="filled">
                    Читать
                </Button>
            </div>
        </div>
    );
};
