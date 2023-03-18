import { Block } from '../../redux';

export const tabHeadlines = (blocks: Block[] | undefined) => {
    let convertedHtml = '';
    blocks?.map((block: any) => {
        switch (block.type && block.data.level) {
            case 'header' && '2':
                convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                break;
            default:
                console.log('Unknown block type', block.type);
                break;
        }
    });
    return convertedHtml;
};
