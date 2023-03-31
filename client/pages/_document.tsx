import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..600,0..1,-50..200&display=optional"
            />
            <body>
                <Main />
                <NextScript />
                <div id="portal-root" />
            </body>
        </Html>
    );
}
