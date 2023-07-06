'use client';

import { motion } from 'framer-motion';
import { useEffect, useCallback, useRef, useState } from 'react';

import type { GetArticleListResponse } from '@/interfaces/get-article-list-res';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { absoluteUrlImageFromStrapi } from '@/lib/utils';

import { ArticlePreview } from './ArticlePreview/ArticlePreview';

export const UpNext: React.FC<{ data: GetArticleListResponse['data'] }> = ({ data }) => {
  const UpNextRef = useRef<HTMLDivElement>(null);
  const [isMount, setIsMount] = useState(false);

  const handleScroll = useCallback(() => {
    const screenHeight = window.screen.height;
    const upNextTop = UpNextRef?.current?.getBoundingClientRect().top ?? 0;

    if (!isMount && screenHeight - upNextTop >= 0) {
      setIsMount(true);
    }
  }, [isMount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (!data.length) return null;

  return (
    <div ref={UpNextRef} className='xxl:max-w-[1240px] mx-auto mt-0 w-full sm:max-w-[760px]'>
      <h2 className='text-[32px] font-light leading-10 tracking-tighter sm:text-[40px] sm:leading-[48px]'>
        Читать дальше
      </h2>
      <div className='mt-8 w-full sm:flex lg:gap-x-10 2xl:w-[760px]'>
        {data?.map(
          ({ attributes }, i) =>
            isMount && (
              <motion.div
                key={i}
                animate={{ y: 0, scale: 1 }}
                className='flex flex-1'
                initial={{ y: 30, scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.15 * (i + 1) }}
              >
                <ArticlePreview
                  cover={absoluteUrlImageFromStrapi(attributes.cover.data.attributes.url)}
                  href={getPublicUrl.blog(attributes.slug)}
                  title={attributes.title}
                />
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};
