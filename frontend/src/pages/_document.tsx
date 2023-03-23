import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html className="light">
            <Head />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            <body>
                <Main />
                <NextScript />
            </body>
            <div id="portal-root" />
        </Html>
    );
}
