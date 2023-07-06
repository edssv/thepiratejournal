import { UserAvatar } from '@/components/user-avatar';

interface AuthorInfoProps {
  username: string;
  image: string | null | undefined;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ image, username }) => {
  const authorname = username || 'deleted';

  return (
    <div className='mb-[30px] flex items-center gap-4 sm:mb-10'>
      <UserAvatar user={{ image: image ?? '', name: username }} />
      <div className='text-lg font-medium text-gray-600 dark:text-gray-400 sm:text-xl'>{authorname}</div>
    </div>
  );
};
