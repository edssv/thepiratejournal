'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { getPublicUrl } from '@/lib/public-url-builder';
import { cn } from '@/lib/utils';
import { userAuthSchema } from '@/lib/validations/auth';
import { AuthService } from '@/services/auth/auth.service';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & { searchParams: { from: string | undefined } };

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, searchParams, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema)
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    if (pathname === '/register') {
      const registerResult = await AuthService.register(data);

      if (!registerResult?.ok) {
        setIsLoading(false);

        return toast({
          title: 'Что-то пошло не так.',
          description: 'Ваш запрос на регистрацию не выполнен. Пожалуйста, попробуйте еще раз.',
          variant: 'destructive'
        });
      }
    }

    const signInResult = await signIn('credentials', {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: searchParams.from || getPublicUrl.home()
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: 'Что-то пошло не так.',
        description: 'Ваш запрос на вход не выполнен. Пожалуйста, попробуйте еще раз.',
        variant: 'destructive'
      });
    }

    return router.replace(searchParams.from || getPublicUrl.home());
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading || isGoogleLoading}
              id='email'
              placeholder='name@example.com'
              type='email'
              {...register('email')}
            />
            {errors?.email && <p className='px-1 text-xs text-red-600'>{errors.email.message}</p>}
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='password'>
              Password
            </Label>
            <Input
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect='off'
              disabled={isLoading || isGoogleLoading}
              id='password'
              placeholder='jQtnVHbyhy'
              type='password'
              {...register('password')}
            />
            {errors?.password && <p className='px-1 text-xs text-red-600'>{errors.password.message}</p>}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Войти с помощью почты
          </button>
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Или продолжить с</span>
        </div>
      </div>
      <button
        className={cn(buttonVariants({ variant: 'outline' }))}
        disabled={isLoading || isGoogleLoading}
        type='button'
        onClick={() => {
          setIsGoogleLoading(true);
          signIn('google');
        }}
      >
        {isGoogleLoading ? (
          <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Icons.google className='mr-2 h-4 w-4' />
        )}{' '}
        Google
      </button>
    </div>
  );
}
