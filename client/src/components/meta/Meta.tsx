import Head from 'next/head';
import type { PropsWithChildren } from 'react';

import type { MetaProps } from './meta.interface';

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME;

const Meta: React.FC<PropsWithChildren<MetaProps>> = ({
  children,
  description = 'Переиграли и уничтожили.',
  home = false,
  image = `${process.env.NEXT_PUBLIC_CLIENT_URL}/assets/og/brand.png`,
  noRobots = false,
  title = projectName,
  type = 'website',
  url = ''
}) => {
  const fullTitle = home ? projectName : `${title} - ${projectName}`;
  const fullUrl = (process.env.NEXT_PUBLIC_CLIENT_URL ?? '') + url;
  const robotsContent = noRobots ? 'noindex, nofollow' : 'all';

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta key='title' content={title} property='og:title' />
        <meta content={title} name='twitter:title' />
        <meta content={type} property='og:type' />
        <meta content={projectName} property='og:site_name' />
        <meta content={description} name='description' />
        <meta content={description} property='og:description' />
        <meta content={description} name='twitter:description' />
        <meta content={image} property='og:image' />
        <meta content={image} name='twitter:image' />
        <meta content={fullUrl} property='og:url' />
        <meta content={fullUrl} name='twitter:url' />
        <meta content='summary_large_image' name='twitter:card' />
        <meta content='2fb5232a43f9c3a6' name='yandex-verification' />
        <meta content='2NihTUNNRZaWfOf4vg3_xeqDysO3l7dgRg64CK2f7PE' name='google-site-verification' />
        <meta content={robotsContent} name='robots' />
      </Head>
      {children}
    </>
  );
};

export default Meta;
