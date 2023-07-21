import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { UserAuthForm } from '@/components/user-auth-form';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Войти',
  description: 'Войдите в свой аккаунт'
};

export default function LoginPage() {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      <Link className={cn(buttonVariants({ variant: 'ghost' }), 'absolute left-4 top-4 md:left-8 md:top-8')} href='/'>
        <>
          <Icons.chevronLeft className='mr-2 h-4 w-4' />
          Назад
        </>
      </Link>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <Image
            alt={`${siteConfig.name}`}
            className='mx-auto h-10 w-10'
            height={40}
            sizes='25vw'
            src={`${siteConfig.url}/android-chrome-192x192.png`}
            width={40}
          />
          <h1 className='text-2xl font-semibold tracking-tight'>Добро пожаловать</h1>
          <p className='text-sm text-muted-foreground'>
            Введите адрес электронной почты, чтобы войти в свою учетную запись
          </p>
        </div>
        <UserAuthForm />
        <p className='px-8 text-center text-sm text-muted-foreground'>
          У вас нет учетной записи?
          <Link className='hover:text-brand underline underline-offset-4' href='/register'>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
