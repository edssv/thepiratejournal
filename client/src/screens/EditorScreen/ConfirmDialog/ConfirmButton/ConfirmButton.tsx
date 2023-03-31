import { MutableRefObject } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMediaPredicate } from 'react-media-hook';

import { readingTime } from '@/helpers';
import { useActions } from '@/hooks';
import Button from '@/components/common/Button/Button';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useCreateArticleMutation, useUpdateArticleMutation } from '@/services';
import { EditorPageMode } from '@/lib/enums';
import { Block } from '@/interfaces/block.interface';

interface ConfirmButtonProps {
    articleContentRef?: React.Ref<HTMLDivElement>;
    blocks: Block[];
}

const Snackbar = dynamic(() => import('@/components/common/Snackbar/Snackbar'), { ssr: false });

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ articleContentRef, blocks }) => {
    const { replace } = useRouter();
    const { setPublishSnackbarVisible } = useActions();

    const { data, mode } = useTypedSelector((state) => state.editorPage);
    const { isPublishSnackbarVisible } = useTypedSelector((state) => state.ui);

    const { mutate, isLoading, isSuccess, isError } = useCreateArticleMutation();
    const { mutate: updateMutation } = useUpdateArticleMutation();

    const isMobile = useMediaPredicate('(max-width: 551px)');

    const saveArticle = async () => {
        const description = (articleContentRef as MutableRefObject<HTMLDivElement>).current.innerText
            .split('.', 2)
            .toString();

        const formData = Object.assign({
            ...data,
            body: blocks,
            readingTime: readingTime(articleContentRef),
            description: data.description ?? description,
        });
        mode === EditorPageMode.EDIT
            ? updateMutation(formData, { onSuccess: () => replace('/') })
            : mutate(formData, { onSuccess: () => replace('/') });
    };

    return (
        <>
            <Snackbar isOpen={isPublishSnackbarVisible} onClose={() => setPublishSnackbarVisible(false)} timeout={5000}>
                {mode === EditorPageMode.EDIT && isSuccess
                    ? 'Статья отправлена на проверку и в скором времени будет опубликована.'
                    : isError
                    ? 'Не удалось опубликовать статью'
                    : ''}
            </Snackbar>
            <Button
                isLoading={isLoading}
                disabled={isLoading || !(data.category && data?.cover && blocks)}
                onClick={() => {
                    saveArticle(), setPublishSnackbarVisible(true);
                }}
                variant="filled"
            >
                {mode === EditorPageMode.EDIT ? (isMobile ? 'Обновить' : 'Обновить статью') : 'Опубликовать'}
            </Button>
        </>
    );
};

export default ConfirmButton;
