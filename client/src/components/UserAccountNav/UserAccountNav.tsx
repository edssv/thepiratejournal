import Link from 'next/link';
import { useRouter } from 'next/router';

import Avatar from '@/components/Avatar/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/common/DropdownMenu/DropdownMenu';
import { checkPermission } from '@/helpers/checkPermission';
import { useActions, useAuth } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

export const UserAccountNav: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => {
  const { push } = useRouter();
  const { user } = useAuth();
  const { logout } = useActions();

  const havePermission = checkPermission(user?.role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...props}>
        <Avatar imageSrc={user?.image} width={32} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <div className='flex  justify-start gap-3 p-4'>
          <span className='material-symbols-outlined icon-thin'>account_circle</span>
          <div className='flex flex-col space-y-1 leading-none'>
            {user?.username && <p>{user.username}</p>}
            {user?.email && <p className='text-muted-foreground w-[200px] truncate text-sm'>{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />
        {havePermission && (
          <>
            <DropdownMenuItem asChild>
              <Link className='flex gap-3' href={getPublicUrl.dashboard()}>
                <span className='material-symbols-outlined icon-thin'>article</span>Статьи
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link className='flex gap-3' href={getPublicUrl.dashboardDrafts()}>
                <span className='material-symbols-outlined icon-thin'>draft</span>Черновики
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem asChild>
          <Link className='flex gap-3' href={getPublicUrl.dashboardSetting()}>
            {' '}
            <span className='material-symbols-outlined icon-thin'>settings</span>Настройки
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='flex gap-3'
          onClick={() => {
            logout();
            push(getPublicUrl.login());
          }}
        >
          <span className='material-symbols-outlined icon-thin'>logout</span> Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
