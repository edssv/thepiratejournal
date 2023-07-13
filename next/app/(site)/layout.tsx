import Link from 'next/link';

import { MainNav } from '@/components/main-nav';
import { SiteFooter } from '@/components/site-footer';
import { buttonVariants } from '@/components/ui/button';
import { UserAccountNav } from '@/components/user-account-nav';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { getCurrentUser } from '@/lib/session';
import { cn } from '@/lib/utils';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: MarketingLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='container z-40 bg-background'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav />
          <nav>
            {user ? (
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email
                }}
              />
            ) : (
              <Link
                className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-4')}
                href={getPublicUrl.login()}
              >
                Войти
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  );
}
