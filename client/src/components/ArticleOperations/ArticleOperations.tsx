import Link from 'next/link';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/common/AlertDialog/AlertDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/common/DropdownMenu/DropdownMenu';
import { toast } from '@/components/common/Toaster/useToast';
import { UserArticlesQueryDocument, useArticleRemoveMutation } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import Button from '../common/Button/Button';

interface ArticleOperationsProps {
  id: number;
}

export const ArticleOperations = ({ id }: ArticleOperationsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [removeArticle, { loading: isRemoveLoading }] = useArticleRemoveMutation();

  const deleteArticle = async () => {
    await removeArticle({
      variables: { id },
      onCompleted: () =>
        toast({
          description: 'Статья удалена.'
        }),
      onError: () =>
        toast({
          description: 'Твоя статья не была удалена. Пожалуйста, попробуй еще раз.'
        }),
      refetchQueries: [{ query: UserArticlesQueryDocument }]
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button icon color='secondary' weight='light'>
            <span className='material-symbols-outlined'>more_vert</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <Link className='flex w-full' href={getPublicUrl.articleEdit(id)}>
              Изменить
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-destructive focus:text-destructive flex cursor-pointer items-center'
            onSelect={() => setShowDeleteAlert(true)}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ты уверен, что хочешь удалить эту статью?</AlertDialogTitle>
            <AlertDialogDescription>Это действие не может быть отменено.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Button>Отмена</Button>
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteArticle}>
              <Button isLoading={isRemoveLoading} variant='filled'>
                Удалить
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
