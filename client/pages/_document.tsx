import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang='ru-RU'>
    <Head />
    <link href='/apple-touch-icon.png' rel='apple-touch-icon' sizes='180x180' />
    <link href='/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png' />
    <link href='/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png' />
    <link href='/site.webmanifest' rel='manifest' />
    <link color='#5bbad5' href='/safari-pinned-tab.svg' rel='mask-icon' />
    <meta content='#da532c' name='msapplication-TileColor' />
    <meta content='#ffffff' name='theme-color' />
    <link
      href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..600,0..1,-50..200'
      rel='stylesheet'
    />
    <body>
      <Main />
      <NextScript />
      <div id='portal-root' />
    </body>
  </Html>
);

export default Document;
