import { redirect } from 'next/navigation';

import { DashboardHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';
import { UserNameForm } from '@/components/user-name-form';
import { authOptions } from '@/lib/auth';
import { getCurrentUser } from '@/lib/session';

export const metadata = {
  title: 'Настройки',
  description: 'Управление настройками учетной записи и веб-сайта.'
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader heading='Настройки' text='Управление настройками учетной записи и веб-сайта.' />
      <div className='grid gap-10'>
        <UserNameForm user={{ id: user.id, name: user.name || '' }} />
      </div>
    </DashboardShell>
  );
}
