import Image from 'next/image';

import { Block } from '@/gql/__generated__';

export const toHtml = (blocks: Block[]) => {
  return blocks?.map((block: Block) => {
    switch (block.type) {
      case 'header':
        if (block.data.level === 2) {
          return (
            <div role="region" className="relative">
              <div className="scrollTarget"></div>
              <h2>${block.data.text}</h2>
            </div>
          );
        }
        if (block.data.level === 3) return <h3>{block.data.text}</h3>;

      case 'embed':
        return (
          <figure>
            <div className="imageContainer">
              {block.data.embed && (
                <iframe
                  width="100%"
                  height="430"
                  src={block.data.embed}
                  allow="autoplay; encrypted-media"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              )}
            </div>
            <figcaption>{block.data.caption}</figcaption>
          </figure>
        );

      case 'paragraph':
        return <p>{block.data.text}</p>;

      case 'delimiter':
        return <hr className="ce-delimiter cdx-block" />;

      case 'image':
        return (
          block.data?.file?.url && (
            <figure>
              <div className="imageContainer">
                <img src={block.data?.file?.url} alt="Image" />
              </div>
              <figcaption>{block.data.caption}</figcaption>
            </figure>
          )
        );

      case 'list':
        return <ul className="cdx-list">{block?.data?.items?.forEach((li: any) => <li>{li}</li>) ?? null}</ul>;
      default:
        break;
    }
  });
};
