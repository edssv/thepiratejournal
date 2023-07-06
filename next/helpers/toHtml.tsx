/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/no-danger */
import Image from 'next/image';

import { absoluteUrlImageFromStrapi } from '@/lib/utils';

export const toHtml = (data: any) =>
  data?.blocks?.map((block: any) => {
    switch (block.type) {
      case 'header':
        if (block.data.level === 2) {
          return (
            <div className='relative' role='region'>
              <div className='scrollTarget' />
              <h2>{block.data.text}</h2>
            </div>
          );
        }
        if (block.data.level === 3) return <h3>{block.data.text}</h3>;
        break;

      case 'embed':
        return (
          <figure>
            <div className='imageContainer'>
              {block.data.embed && (
                <iframe
                  allowFullScreen
                  allow='autoplay; encrypted-media'
                  height='430'
                  src={block.data.embed}
                  style={{ border: 0 }}
                  title='Video'
                  width='100%'
                />
              )}
            </div>
            <figcaption>{block.data.caption}</figcaption>
          </figure>
        );

      case 'paragraph':
        return block.data.text && <p dangerouslySetInnerHTML={{ __html: block.data.text }} />;

      case 'delimiter':
        return <hr className='ce-delimiter cdx-block' />;

      case 'image':
        return (
          block.data?.file?.url && (
            <figure>
              <div className='imageContainer'>
                <Image
                  alt='Image'
                  height={0}
                  sizes='100vw'
                  src={absoluteUrlImageFromStrapi(block.data.file.url)}
                  style={{ width: '100%', height: '100%' }}
                  width={0}
                />
              </div>
              <figcaption>{block.data.caption}</figcaption>
            </figure>
          )
        );

      case 'list':
        return (
          <ul className='cdx-list'>
            {block?.data?.items?.forEach((li: any, i: any) => <li key={i}>{li}</li>) ?? null}
          </ul>
        );
      default:
        break;
    }

    return null;
  });
