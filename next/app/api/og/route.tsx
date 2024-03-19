/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ImageResponse } from '@vercel/og';

import { siteConfig } from '@/config/site';
import { absoluteUrlImageFromStrapi } from '@/lib/utils';
import { ogImageSchema } from '@/lib/validations/og';

export const runtime = 'edge';

const interRegular = fetch(new URL('../../../assets/fonts/Inter-Regular.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer()
);

const interBold = fetch(new URL('../../../assets/fonts/CalSans-SemiBold.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer()
);

export async function GET(req: Request) {
  try {
    const fontRegular = await interRegular;
    const fontBold = await interBold;

    const url = new URL(req.url);
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));
    const heading = values.heading.length > 140 ? `${values.heading.substring(0, 140)}...` : values.heading;

    const { image, mode } = values;
    const paint = mode === 'dark' ? '#fff' : '#000';

    const fontSize = heading.length > 100 ? '48px' : '64px';

    return new ImageResponse(
      (
        <div
          tw='flex bg-no-repeat relative flex-col n p-12 w-full h-full items-start'
          style={{
            color: paint,
            backgroundImage: `url(${new URL(absoluteUrlImageFromStrapi(image))})`,
            backgroundColor: '#7678ed',
            backgroundSize: '100% 100%'
          }}
        >
          <div
            tw='absolute w-[1200px] h-[630px] top-0 left-0 bottom-0'
            style={{
              background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.25))',
              backgroundSize: '100% 100%'
            }}
          />
          <div tw='flex flex-col h-full justify-end flex-1 py-10'>
            <div
              style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
              tw='flex text-xl uppercase font-bold tracking-tight'
            >
              {values.type}
            </div>
            <div
              tw='flex leading-[1.1] text-[80px] font-bold'
              style={{
                fontFamily: 'Cal Sans',
                fontWeight: 'bold',
                marginLeft: '-3px',
                fontSize
              }}
            >
              {heading}
            </div>
          </div>
          <div tw='flex items-center w-full justify-between'>
            <div tw='flex items-center'>
              <div
                style={{
                  background: `url(http://localhost:3000/android-chrome-192x192.png)`,
                  backgroundSize: '42px 42px',
                  width: '42px',
                  height: '42px',
                  marginRight: '12px'
                }}
              />
              <div style={{ fontFamily: 'Inter', fontWeight: 'normal' }} tw='text-xl font-medium'>
                {siteConfig.name}
              </div>
            </div>
            <div style={{ fontFamily: 'Inter', fontWeight: 'normal' }} tw='flex text-xl'>
              thepiratejournal.ru
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontRegular,
            weight: 400,
            style: 'normal'
          },
          {
            name: 'Cal Sans',
            data: fontBold,
            weight: 700,
            style: 'normal'
          }
        ]
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500
    });
  }
}
