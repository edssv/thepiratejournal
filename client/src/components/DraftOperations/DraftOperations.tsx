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
import { UserDraftsQueryDocument, useDraftRemoveMutation } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import Button from '../common/Button/Button';

interface DraftOperationsProps {
  id: number;
}

export const DraftOperations = ({ id }: DraftOperationsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [removeDraft, { loading: isRemoveLoading }] = useDraftRemoveMutation();

  const deleteDraft = async () => {
    await removeDraft({
      variables: { id },
      onCompleted: () =>
        toast({
          description: 'Черновик удален.'
        }),
      onError: () =>
        toast({
          description: 'Твой черновик не был удален. Пожалуйста, попробуй еще раз.'
        }),
      refetchQueries: [{ query: UserDraftsQueryDocument }]
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
            <Link className='flex w-full' href={getPublicUrl.draftEdit(id)}>
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
            <AlertDialogTitle>Ты уверен, что хочешь удалить черновик?</AlertDialogTitle>
            <AlertDialogDescription>Это действие не может быть отменено.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Button>Отмена</Button>
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteDraft}>
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
