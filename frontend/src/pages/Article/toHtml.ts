import { Block } from '../../redux';

export const toHtml = (blocks: Block[]) => {
    let convertedHtml = '';
    blocks.map((block: any) => {
        switch (block.type) {
            case 'header':
                convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                break;
            case 'embded':
                convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
                break;
            case 'paragraph':
                convertedHtml += `<p>${block.data.text}</p>`;
                break;
            case 'delimiter':
                convertedHtml += '<hr class="ce-delimiter cdx-block"/>';
                break;
            case 'image':
                convertedHtml += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
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
