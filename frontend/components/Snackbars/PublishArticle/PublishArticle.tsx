'use client';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks';
import { publishSnackbarVisibleSelector, setPublishSnackbarVisible } from '@/redux';
import { Snackbar } from '@/components';

export const PublishArticle = () => {
    const dispatch = useAppDispatch();
    const isPublishSnackbarVisible = useSelector(publishSnackbarVisibleSelector);

    return (
        <Snackbar
            isOpen={isPublishSnackbarVisible}
            close
            onClose={() => dispatch(setPublishSnackbarVisible(false))}
            position="center">
            Статья отправлена на проверку и в скором времени будет опубликована.
        </Snackbar>
    );
};
