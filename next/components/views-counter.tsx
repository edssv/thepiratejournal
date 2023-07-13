import React from 'react';

import { Icons } from './icons';

export default function ViewsCounter({ views }: { views: number }) {
  return (
    <div className='flex items-center gap-1.5'>
      <Icons.eyeOpen className='h-5 w-5' />
      <span className='font-mono text-sm'>{views}</span>
    </div>
  );
}
