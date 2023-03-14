import { Block } from '../../redux';

export const toHtml = (blocks: Block[] | undefined) => {
    let convertedHtml = '';
    blocks?.map((block: any) => {
        switch (block.type) {
            case 'header':
                if (block.data.level === 2) {
                    convertedHtml += `<div role="region" class="relative"><div class="scrollTarget"></div><h2 id='a${block.id}'>${block.data.text}</h2></div>`;
                    break;
                }
                convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                break;
            case 'embed':
                convertedHtml += `<iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
                break;
            case 'paragraph':
                convertedHtml += `<p>${block.data.text}</p>`;
                break;
            case 'delimiter':
                convertedHtml += '<hr class="ce-delimiter cdx-block"/>';
                break;
            case 'image':
                convertedHtml += `<figure>
                                        <div class="imageContainer">
                                            <img class="imgFluid" src="${block.data?.file?.url}" title="${block.data?.caption}" loading="lazy"/>
                                        </div>
                                        <figcaption>${block.data.caption}</figcaption>
                                </figure>`;
                break;
            case 'list':
                convertedHtml += '<ul class="cdx-list">';
                block.data.items.forEach(function (li: any) {
                    convertedHtml += `<li>${li}</li>`;
                });
                convertedHtml += '</ul>';
                break;
            default:
                console.log('Unknown block type', block.type);
                break;
        }
    });
    return convertedHtml;
};
