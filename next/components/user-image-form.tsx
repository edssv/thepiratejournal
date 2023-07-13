'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import ReactCrop, { type Crop } from 'react-image-crop';
import type * as z from 'zod';

import 'react-image-crop/dist/ReactCrop.css';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { userImageSchema } from '@/lib/validations/user';
import { UploadService } from '@/services/upload/upload.service';
import { UserService } from '@/services/user/user.service';

import { UserAvatar } from './user-avatar';

interface UserImageFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: { id: number; image: string };
}

type FormData = z.infer<typeof userImageSchema>;

export function UserImageForm({ className, user, ...props }: UserImageFormProps) {
  const router = useRouter();
  const filePicker = React.useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = React.useState<string | null>(user.image);
  const [crop, setCrop] = React.useState<Crop>();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(userImageSchema),
    defaultValues: {
      image: user?.image || ''
    }
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await UserService.update({ image: data.image });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your name was not updated. Please try again.',
        variant: 'destructive'
      });
    }

    toast({
      description: 'Your name has been updated.'
    });

    router.refresh();
  }

  const handleUpload = React.useCallback(async () => {
    console.log(filePicker?.current?.files);
    if (!filePicker?.current?.files) return;

    const formData = new FormData();
    formData.append('data', JSON.stringify(filePicker?.current?.files[0]));
    console.log(formData);
    const response = await UploadService.upload(formData);

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your name was not updated. Please try again.',
        variant: 'destructive'
      });
    }

    console.log(response);
  }, [filePicker]);

  const handlePick = () => {
    filePicker.current?.click();
  };

  const { ref, ...rest } = register('image', { onChange: handleUpload });

  return (
    <form className={cn(className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Ваш аватар</CardTitle>
          <CardDescription>Нажмите на аватар, чтобы загрузить собственный из ваших файлов.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='name'>
              Name
            </Label>
            <input
              {...rest}
              ref={(e) => {
                ref(e);
                filePicker.current = e;
              }}
              accept='image/jpeg,image/png,image/webp'
              className='hidden'
              type='file'
            />
            <button onClick={() => handlePick()}>
              <UserAvatar className='h-[78px] w-[78px]' user={{ image: user.image }} />
            </button>
            {errors?.image && <p className='px-1 text-xs text-red-600'>{errors.image.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <button className={cn(buttonVariants(), className)} disabled={isSaving} type='submit'>
            {isSaving && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
