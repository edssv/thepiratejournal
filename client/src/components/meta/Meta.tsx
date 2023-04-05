import { PropsWithChildren } from 'react';
import Head from 'next/head';

import { Meta } from './meta.interface';

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME;

const Meta: React.FC<PropsWithChildren<Meta>> = ({
  title = projectName,
  description = 'Переиграли и уничтожили.',
  image = `${process.env.NEXT_PUBLIC_CLIENT_URL}/assets/og/brand.png`,
  type = 'website',
  url = '',
  noRobots = false,
  home = false,
  children,
}) => {
  const fullTitle = home ? projectName : `${title} - ${projectName}`;
  const fullUrl = (process.env.NEXT_PUBLIC_CLIENT_URL ?? '') + url;
  const robotsContent = noRobots ? 'noindex, nofollow' : 'all';

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta property="og:title" content={title} key="title" />
        <meta name="twitter:title" content={title} />
        <meta name="og:type" content={type} />
        <meta name="og:site_name" content={projectName} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta name="og:image" content={image} />
        <meta name="twitter:image" content={image} />
        <meta name="og:url" content={fullUrl} />
        <meta name="twitter:url" content={fullUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content={robotsContent} />
      </Head>
      {children}
    </>
  );
};

export default Meta;
