import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Avatar from '@/components/Avatar/Avatar';
import UploadAvatar from '@/components/UploadAvatar/UploadAvatar';
import Button from '@/components/common/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogCloseIcon
} from '@/components/common/Dialog/Dialog';
import { useUpdateProfileMutation } from '@/gql/__generated__';
import { useLazyGetNewTokensQuery } from '@/services/auth/auth.service';
import type { UserState } from '@/store/user/user.interface';

import UsernameField from '../../AuthScreen/Fields/UsernameField';

import SettingsButton from './SettingsButton/SettingsButton';

interface SettingsScreenProps {
  user: UserState;
}

export interface ProfileFormData {
  username: string;
  image: string | null;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ user }) => {
  const [showDialog, setShowDialog] = useState(false);
  const methods = useForm<ProfileFormData>({
    defaultValues: { username: user.username, image: user.image }
  });

  const [updateProfile] = useUpdateProfileMutation();
  const [refreshUser] = useLazyGetNewTokensQuery();

  const onSubmit = methods.handleSubmit((formData: ProfileFormData) => {
    updateProfile({ variables: { updateProfileInput: formData }, onCompleted: () => refreshUser() });
  });

  return (
    <div className='root'>
      <SettingsButton
        description='Изменить имя пользователя, фотографию'
        heading='Информация профиля'
        onClick={() => setShowDialog(true)}
      >
        {' '}
        <span>{user.username}</span>
        <Avatar imageSrc={user.image} />
      </SettingsButton>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className='w-full max-w-[552px]'>
          <DialogHeader>
            <DialogTitle className='DialogTitle'>Изменить профиль</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col gap-8'>
            <FormProvider {...methods}>
              <UploadAvatar />
              <UsernameField />{' '}
            </FormProvider>
          </div>
          <DialogFooter className='flex justify-end gap-4'>
            <DialogClose>
              <Button variant='outlined' onClick={() => methods.reset()}>
                Отмена
              </Button>
            </DialogClose>
            <DialogClose>
              <Button disabled={!methods.formState.isValid} variant='filled' onClick={() => onSubmit()}>
                Сохранить
              </Button>
            </DialogClose>
          </DialogFooter>
          <DialogCloseIcon asChild />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsScreen;
