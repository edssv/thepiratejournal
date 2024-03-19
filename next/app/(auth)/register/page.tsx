import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { UserAuthForm } from '@/components/user-auth-form';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface RegisterPageProps {
  searchParams: { from: string | undefined };
}

export const metadata = {
  title: 'Создать аккаунт',
  description: 'Создайте учетную запись, чтобы начать.'
};

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  return (
    <div className='container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
        href='/login'
      >
        Войти
      </Link>
      <div className='hidden h-full bg-muted lg:block' />
      <div className='lg:p-8'>
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
            <h1 className='text-2xl font-semibold tracking-tight'>Создать аккаунт</h1>
            <p className='text-sm text-muted-foreground'>
              Введите адрес электронной почты ниже, чтобы создать учетную запись
            </p>
          </div>
          <UserAuthForm searchParams={searchParams} />
          <p className='px-8 text-center text-sm text-muted-foreground'>
            Нажимая продолжить, вы соглашаетесь с нашими{' '}
            <Link className='hover:text-brand underline underline-offset-4' href='/terms'>
              Условия использования
            </Link>{' '}
            и{' '}
            <Link className='hover:text-brand underline underline-offset-4' href='/privacy'>
              Политика конфиденциальности
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
