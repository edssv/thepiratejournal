import { useRouter } from 'next/router';
import React from 'react';

import Button from '@/components/common/Button/Button';
import DashboardNav from '@/components/layout/DashboardLayout/DashboardNav/DashboardNav';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

interface DashboardHeaderProps {
  heading: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ heading }) => {
  const { push } = useRouter();

  return (
    <div className='mb-1 mt-12 flex w-full flex-col justify-between gap-10 pb-5 sm:mt-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[42px] font-medium leading-[52px] sm:text-2xl'>{heading}</h1>
        <Button startIcon='edit' variant='filled' onClick={() => push(getPublicUrl.editor())}>
          Создать статью
        </Button>
      </div>
      <DashboardNav />
    </div>
  );
};

export default DashboardHeader;
