'use client';

import Output from 'editorjs-react-renderer';
import Image from 'next/image';

import { absoluteUrlImageFromStrapi, cn } from '@/lib/utils';

const CustomHeaderRenderer = ({ classNames, data, style }: any) => {
  const level = data.level as number;
  const levels = { 2: 'h2', 3: 'h3', 4: 'h4' } as any;

  const Tag = levels[level];

  return data.text ? (
    <Tag
      style={style}
      className={cn('scroll-m-20 tracking-tight', classNames, {
        'mt-10 border-b pb-1 text-3xl font-semibold first:mt-0': level === 2,
        'mt-8 text-2xl font-semibold': level === 3,
        'mt-8 text-xl font-semibold': level === 4
      })}
    >
      {data.text}
    </Tag>
  ) : (
    ''
  );
};

const CustomParagraphRenderer = ({ classNames, data, style }: any) =>
  data.text ? (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', classNames)} style={style}>
      {data.text}
    </p>
  ) : (
    ''
  );

const CustomImageRenderer = ({ classNames, config, data, ...props }: any) =>
  data.file ? (
    <figure className='mt-6 xl:-mx-4'>
      <Image
        alt={data.file.alt}
        className={cn('rounded-md', classNames)}
        height={data.file.height}
        sizes='100vw'
        src={absoluteUrlImageFromStrapi(data.file.url)}
        width={data.file.width}
        {...props}
      />
      {data.caption && (
        <figcaption className='mt-2 text-center text-sm text-muted-foreground'>{data.caption}</figcaption>
      )}
    </figure>
  ) : (
    ''
  );

const CustomQuoteRenderer = ({ classNames, data, props }: any) =>
  data.text ? (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground', classNames)} {...props}>
      <p className='leading-7 [&:not(:first-child)]:mt-6'>{data.text}</p>
    </blockquote>
  ) : (
    ''
  );

const CustomListRenderer = ({ classNames, data, props }: any) =>
  data.items ? (
    <ul className={cn('my-6 ml-6 list-disc', classNames)} {...props}>
      {data.items.map((item: string) => (
        <li className='mt-2'>{item}</li>
      ))}
    </ul>
  ) : (
    ''
  );

const CustomVideoRenderer = ({ classNames, config, data, ...props }: any) =>
  data ? (
    <figure className='mt-6 xl:-mx-4'>
      <iframe
        allowFullScreen
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        className='w-full md:h-[450px]'
        height={data.height}
        loading='lazy'
        src={data.embed}
        title={data.caption}
      />
      {data.caption && (
        <figcaption className='mt-2 text-center text-sm text-muted-foreground'>{data.caption}</figcaption>
      )}
    </figure>
  ) : (
    ''
  );

const CustomTableRenderer = ({ data }: any) =>
  data.content ? (
    <table>
      {data.withHeadings && (
        <thead>
          {data.content.slice(0, 1).map((row: string[]) => (
            <tr className='m-0 border-t p-0 even:bg-muted'>
              {row.map((td) => (
                <th className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'>
                  {td}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      )}
      <tbody>
        {data.content.slice(1).map((row: string[]) => (
          <tr className='m-0 border-t p-0 even:bg-muted'>
            {row.map((td) => (
              <td className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'>
                {td}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    ''
  );

const CustomDelimiterRenderer = ({ props }: any) => <hr className='my-4 md:my-8' {...props} />;

const renderers = {
  header: CustomHeaderRenderer,
  paragraph: CustomParagraphRenderer,
  image: CustomImageRenderer,
  quote: CustomQuoteRenderer,
  list: CustomListRenderer,
  table: CustomTableRenderer,
  delimiter: CustomDelimiterRenderer,
  embed: CustomVideoRenderer
};

export function Body({ data }: { data: [] }) {
  return <Output data={data} renderers={renderers} />;
}
